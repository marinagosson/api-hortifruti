import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Establishment from 'App/Models/Establishment';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'marinagosson.dev2@gmail.com',
      password: '123456',
      type: 'establishments'
    });
    await Establishment.create({
      name: 'Estabelecimento 1',
      logo: 'https://via.placeholder.com/150',
      online: true,
      blocked: false,
      userId: user.id
    });
  }
}
