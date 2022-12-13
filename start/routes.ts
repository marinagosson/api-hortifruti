/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User'

Route.get('/', async () => {
  return 'welcome';
})

Route.post('/users',async ({request, response}: HttpContextContract) => {
  const email = request.input('email')
  const password = request.input('password')
  if(email == null) return response.badRequest({"success": false, "message": "Campo e-mail não informado", "data": null})
  if(password == null) return response.badRequest({"success": false, "message": "Campo password não informado", "data": null})
  const createdUser = await User.create({
    email: email,
    password: password
  })
  return response.ok({"success": true, "message": "Usuário criado com sucesso", "data": createdUser.toJSON()})
})

Route.post('/auth', async ({request, response, auth}: HttpContextContract) => {

  const email = request.input('email')
  const password = request.input('password')
  const user = await User.findBy('email', email);
  
  if(user == null) {
    return response.notFound({"success": false, "message": "Usuário não encontrado", "data": null})
  } else {
    const token = await auth.use('api').attempt(email, password);
    return response.ok(token)
  }
})

Route.get('/users', async () => {
  const users = await Database.from('users').select('*')
  return users;
  
}).middleware('auth')
