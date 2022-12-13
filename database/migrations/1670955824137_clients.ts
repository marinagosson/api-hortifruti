import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'
  protected tableFieldId = 'id'
  protected tableFieldUserID = 'user_id'
  protected tableFieldName = 'name'
  protected tableFieldPhone = 'phone'
  protected tableFieldUpdatedAt = 'updated_at'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldId).primary()
      table.integer(this.tableFieldUserID).unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string(this.tableFieldName, 255).notNullable()
      table.string(this.tableFieldPhone, 15).notNullable()
      table.timestamp(this.tableFieldUpdatedAt).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
