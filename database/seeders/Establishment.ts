import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CitiesEstablishment from 'App/Models/CitiesEstablishment';
import Establishment from 'App/Models/Establishment';
import User from 'App/Models/User';
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public async run () {

    for(let i = 3; i<= 23; i++) {
      await User.create({
        email: `estabelecimento${i}@gmail.com`,
        password: '123456',
        type: 'establishments'
      });
    }
    
    for(let i = 0; i<= 20; i++) {
      const establishment = await Establishment.create({
        name: `Estabelecimento ${i}`,
        logo: `https://i.picsum.photos/id/${i}/200/200`,
        online: true,
        blocked: false,
        userId: i+3
      });

      await CitiesEstablishment.create({
        city_id: i <= 10 ? 1 : 2,
        establishment_id: establishment.id,
        delivery_cost: faker.datatype.float({min: 0, max: 10, precision: 0.5})
      })
    }
  
  }
}
