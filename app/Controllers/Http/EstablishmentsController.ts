import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Establishment from 'App/Models/Establishment'

export default class EstablishmentsController {
    public async list({response}: HttpContextContract){
        const establishment = await Establishment.query().orderBy('name', 'asc')
        response.ok({
            message: '',
            success: true,
            count: establishment.length,
            data: establishment
        })
    }
}
