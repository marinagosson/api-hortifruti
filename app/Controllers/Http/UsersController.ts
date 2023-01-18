import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Admin from 'App/Models/Admin';
import Client from 'App/Models/Client';
import Establishment from 'App/Models/Establishment';

export default class UsersController {

    public async me({auth, response}: HttpContextContract){
        const userAuthenticated = await auth.use("api").authenticate();
        let data;
        switch(userAuthenticated.type) {
            case "clients":
                const client = await Client.findByOrFail("userId", userAuthenticated.id);
                data = {
                    client_id: client.id,
                    name: client.name,
                    phone: client.phone,
                    user: userAuthenticated
                }
                break;
            case "admins":
                const admin = await Admin.findByOrFail("userId", userAuthenticated.id);
                data = {
                    admin_id: admin.id,
                    name: admin.name,
                    user: userAuthenticated
                }
                break;
            case "establishments":
                const establishment = await Establishment.findByOrFail("userId", userAuthenticated.id);
                data = {
                    establishment_id: establishment.id,
                    name: establishment.name,
                    logo: establishment.logo,
                    online: establishment.online,
                    blocked: establishment.blocked,
                    user: userAuthenticated
                }
                break;
            default:
                return response.unauthorized('Unauthorized for it')
        }
        return response.ok(data);
    }

    public async users({auth, response}) {
        const userAuthenticated = await auth.use("api").authenticate();
        let data;
        switch(userAuthenticated.type) {
            case "admins":
                data = await Database.from('users').select('*')
                break;
            default:
                return response.unauthorized('Unauthorized for it')
        }
        response.ok(data);
    }

}
