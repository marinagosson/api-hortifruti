import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Establishment from './Establishment';
import State from './State';

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public state_id: string;

  @column()
  public active: boolean;

  @hasOne(() => State, {
    foreignKey: 'id',
    localKey: 'state_id',
  })
  public state: HasOne<typeof State>

  @manyToMany(() => Establishment, {
    pivotTable: 'cities_establishments',
    localKey: 'id',
    pivotForeignKey: 'city_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'establishment_id'
  })

  public establishments: ManyToMany<typeof Establishment>
}
