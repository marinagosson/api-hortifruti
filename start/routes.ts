import Route from '@ioc:Adonis/Core/Route'

Route.post('/auth', 'AuthController.login');
Route.post('/logout', 'AuthController.logout');

Route.group(() => {
  Route.get("/me", "UsersController.me")
  Route.get("/users", "UsersController.users")
  Route.post("/client", "ClientsController.create")
  Route.put("/client", "ClientsController.update")
  Route.get("/cities", "CitiesController.list")
  Route.post("/city", "CitiesController.create")
  Route.get("/cities-has-establishment", "CitiesController.listAllHasEstablisment")
  Route.get("/establishments", "EstablishmentsController.list")
  Route.get("/city/:id/establishments", "CitiesController.listEstablishmentFromCity")
  Route.get("/addresses", "AddressesController.list")
  Route.post("/address", "AddressesController.create")
  Route.delete("/address/:id", "AddressesController.delete")
}).middleware("auth");

Route.get('/', async () => {
  return 'Welcome';
})
