import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
    public async login({auth, request, response}: HttpContextContract){
        
        const email = request.input('email')
        const password = request.input('password')

        try {
            const user = await User.findByOrFail('email', email);

            let expired;

            if(user != null) {
                switch(user.type) {
                    case 'clients':
                        expired = '30days';
                        break;
                    case 'establishments':
                        expired = '7days';
                        break;
                    case 'admins':
                        expired = '1day';
                        break;
                    default:
                        expired = '30days';
                        break;
                }
    
                const token = await auth.use("api").attempt(email, password, {
                    expiresIn: expired,
                    name: user.serialize().email
                })
    
                response.ok(token);
            }
        } catch {
            return response.badRequest('Invalid credencials')
        }
    }

    public async logout({auth, response}: HttpContextContract){
        try {
            await auth.use("api").revoke();
        } catch {
            return response.unauthorized('You are not logged in');
        }

        return response.ok({
            revoked: true
        })
    }
}
