import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class State extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string;

}
