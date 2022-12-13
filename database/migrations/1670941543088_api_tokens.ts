import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  
  protected tableName = 'api_tokens'
  protected tableFieldId = 'id'
  protected tableFieldUserID = 'user_id'
  protected tableFieldName = 'name'
  protected tableFieldType = 'type'
  protected tableFieldToken = 'token'
  protected tableFieldExpiresAt = 'expires_at'
  protected tableFieldCreatedAt = 'created_at'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldId).primary()
      table.integer(this.tableFieldUserID).unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string(this.tableFieldName).notNullable()
      table.string(this.tableFieldType).notNullable()
      table.string(this.tableFieldToken, 64).notNullable().unique()
      table.timestamp(this.tableFieldExpiresAt).nullable()
      table.timestamp(this.tableFieldCreatedAt).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
