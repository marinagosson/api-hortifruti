import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'establishments'
  protected tableFieldId = 'id'
  protected tableFieldUserID = 'user_id'
  protected tableFieldLogo = 'logo'
  protected tableFieldName = 'name'
  protected tableFieldBlocked = 'blocked'
  protected tableFieldOnline = 'online'
  protected tableFieldUpdatedAt = 'updated_at'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer(this.tableFieldUserID).unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string(this.tableFieldName, 255).notNullable()
      table.string(this.tableFieldLogo, 255).nullable()
      table.boolean(this.tableFieldBlocked).defaultTo(false)
      table.boolean(this.tableFieldOnline).defaultTo(false)
      table.timestamp(this.tableFieldUpdatedAt).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
