import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'
import State from 'App/Models/State'
import CreateCityValidator from 'App/Validators/CreateCityValidator'

export default class CitiesController {

    public async list({response}: HttpContextContract){
        const cities = await City.query().orderBy('name', 'asc').preload('state')
        response.ok({
            message: '',
            success: true,
            count: cities.length,
            data: cities
        })
    }

    public async create({auth, request, response}: HttpContextContract) {
        
        const user = await auth.use('api').authenticate()
        if(user.type == 'admins') {
            const payload = await request.validate(CreateCityValidator)
            const state = await State.findByOrFail('id', payload.state_id)
            if(state) {

                try {
                    const cityCreated = await City.create({name: payload.name, state_id: payload.state_id, active: payload.active})
                    return response.ok({
                        message: 'Created city with success',
                        success: true,
                        data: cityCreated
                    })
                } catch (error) {
                    return response.badRequest({
                        message: 'Error' + error,
                        success: false,
                        data: null
                    })
                }
            
            }
        } else {
            return response.forbidden({
                message: 'You don\'t have permission for it',
                success: false,
                data: null
            })
        }
                
    }

    /* 
    city/:id/establishments
    */
    public async listEstablishmentFromCity({params, response}: HttpContextContract){
        const cities = await City.query().where('id', params.id).preload('establishments').firstOrFail()
        response.ok({
            message: '',
            success: true,
            count: cities.establishments.length,
            data: cities.establishments,
        })
    }

    public async listAllHasEstablisment({response}: HttpContextContract){
        const cities = await City.query().whereHas("establishments", (query) => {
            query.where('blocked', false)
        }).preload('state')
        response.ok({
            message: '',
            success: true,
            count: cities.length,
            data: cities
        })
    }
}
