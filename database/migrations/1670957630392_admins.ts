import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'admins'
  protected tableFieldId = 'id'
  protected tableFieldUserID = 'user_id'
  protected tableFieldName = 'name'
  protected tableFieldUpdatedAt = 'updated_at'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldId).primary()
      table.integer(this.tableFieldUserID).unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string(this.tableFieldName, 255).notNullable()
      table.timestamp(this.tableFieldUpdatedAt).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
