import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth', 'AuthController.login');
Route.post('/logout', 'AuthController.logout');

Route.group(() => {
  Route.get("/me", "UsersController.me")
  Route.get("/users", "UsersController.users")
  Route.post("/client", "ClientsController.create")
  Route.put("/client", "ClientsController.update")
}).middleware("auth");

Route.get('/', async () => {
  return 'Welcome';
})
