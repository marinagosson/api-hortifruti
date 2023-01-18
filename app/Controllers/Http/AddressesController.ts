import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import Client from 'App/Models/Client'
import CreateAddressValidator from 'App/Validators/CreateAddressValidator'

export default class AddressesController {

    public async list({auth, response}: HttpContextContract){
        const userAuthenticated = await auth.use('api').authenticate()
        let client

        try {
            client = await Client.findByOrFail('user_id', userAuthenticated.id)
        } catch (error) {
            return response.forbidden({
                message: 'Client not found for this user',
                success: true,
                data: null
            })
        }

        const getClient = await Client.query()
        .where('id', client.id)
        .preload('addresses', (CityQuery) => {
            CityQuery.preload('city'), (StateQuery) => {
                StateQuery.preload('state')
            }
         }).firstOrFail()

         return response.ok({
            message: 'List of all address from client',
            success: true,
            count: getClient.addresses.length,
            data: getClient.addresses
        })
    }

    public async create({auth, request, response}: HttpContextContract){
        const payload = await request.validate(CreateAddressValidator)
        const userAuthenticated = await auth.use('api').authenticate()
        const client = await Client.findByOrFail('user_id', userAuthenticated.id)

        const addressCreated = await Address.create({
            street: payload.street,
            number: payload.number,
            cityId: payload.city_id,
            clientId: client.id,
            referencePoint: payload.referencePoint,
            neighborhood: payload.neighborhood, 
            complement: payload.complement
        })

        return response.ok({
            message: 'Address created with success',
            success: true,
            data: addressCreated
        })
    }

    public async delete({response, params}: HttpContextContract){
        try {
            const result = await Address.query().where('id', params.id).delete()
            if(result.includes(1)) {
                return response.ok({
                    message: 'Address deleted with success',
                    success: true,
                    data: null
                })
            } else {
                return response.notFound({
                    message: 'Address not found',
                    success: false,
                    data: null
                })
            }
        } catch (error) {
            return response.badRequest({
                message: 'Error when consult this address',
                success: false,
                data: null
            })
        }
    }
}
