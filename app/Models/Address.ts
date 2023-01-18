import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import City from './City'
import Client from './Client'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public street: string

  @column()
  public number: string | null

  @column()
  public clientId: number;

  @column()
  public cityId: number;

  @column()
  public referencePoint: string | null

  @column()
  public complement: string | null

  @column()
  public neighborhood: string | null

  @hasOne(() => City, {
    localKey: 'cityId',
    foreignKey: 'id'
  })

  public city: HasOne<typeof City>

  @hasOne(() => Client, {
    localKey: 'clientId',
    foreignKey: 'id'
  })

  public client: HasOne<typeof Client>
}
