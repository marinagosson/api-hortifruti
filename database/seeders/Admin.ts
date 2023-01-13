import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'marina.gosson@gmail.com',
      password: '123456',
      type: 'admins'
    });
    await Admin.create({
      name: 'Admin',
      userId: user.id
    });
  }
}
