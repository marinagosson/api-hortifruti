import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Client from 'App/Models/Client';
import User from 'App/Models/User';
import CreateClientValidator from 'App/Validators/CreateClientValidator';
import UpdateClientValidator from 'App/Validators/UpdateClientValidator';

export default class ClientsController {
    
    public async create({request, response} : HttpContextContract){
        const payload = await request.validate(CreateClientValidator)
        const user = await User.create({email: payload.email, type: 'clients', password: payload.password})
        const client = await Client.create({name: payload.name, phone: payload.phone, userId: user.id})
        return response.ok({
            message: 'created client with success',
            success: true,
            data: {
                id: client.id,
                name: client.name,
                email: user.email,
                phone: client.phone
            }
        })
    }

    public async update({auth, request, response} : HttpContextContract) {
        const payload = await request.validate(UpdateClientValidator)
        const userAuthenticated = await auth.use('api').authenticate()

        const transaction = await Database.transaction()
        try {
            const user = await User.findByOrFail('id', userAuthenticated.id)
            const client = await Client.findByOrFail('user_id', userAuthenticated.id)

            if(payload.password) {
                user.merge({
                    email: payload.email,
                    password: payload.password
                })
            } else {
                user.merge({
                    email: payload.email,
                })
            }

            await user.save()

            client.merge({
                name: payload.name,
                phone: payload.phone
            })

            await client.save()

            return response.ok({
                message: 'updated client with success',
                success: true,
                data: {
                    id: client.id,
                    name: client.name,
                    email: user.email,
                    phone: client.phone
                }
            })
        } catch (error) {
            await transaction.rollback()
            response.badRequest({
                message: 'Error when updated client',
                success: false,
                error: error
            })
        }
    } 
}
