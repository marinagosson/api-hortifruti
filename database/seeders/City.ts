import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import City from 'App/Models/City';
import State from 'App/Models/State';

export default class extends BaseSeeder {
  public async run () {

    const ce = await State.create({
      name: 'Ceará',
      id: 'CE'
    });

    await City.create({
      name: 'Fortaleza',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Caucaia',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Messejana',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Eusébio',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Sobral',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Crateús',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Cedro',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Madalena',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Canindé',
      active: true,
      state_id: ce.id
    });
    await City.create({
      name: 'Juazeiro do Norte',
      active: true,
      state_id: ce.id
    });
  }
}
