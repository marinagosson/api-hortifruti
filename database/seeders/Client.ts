import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client';
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'marinagosson.dev1@gmail.com',
      password: '123456',
      type: 'clients'
    });

    await Client.create({
      name: 'Client 1',
      phone: '11 99999-9999',
      userId: user.id
    });
  }
}
