import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  
  protected tableName = 'users'
  protected tableFieldId = 'id'
  protected tableFieldEmail = 'email'
  protected tableFieldPassword = 'password'
  protected tableFieldRememberMeToken = 'remember_me_token'
  protected tableFieldType = 'type'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldId).primary()
      table.string(this.tableFieldEmail, 255).notNullable().unique()
      table.string(this.tableFieldPassword, 180).notNullable()
      table.string(this.tableFieldRememberMeToken).notNullable().defaultTo(false)
      table.string(this.tableFieldType, 20).notNullable().defaultTo('client')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
