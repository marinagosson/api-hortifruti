import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities'
  protected tablFieldID = 'id'
  protected tableFieldStateID = 'state_id'
  protected tableFieldName = 'nome'
  protected tableFieldUpdatedAt = 'updated_at'


  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tablFieldID)
      table.integer(this.tableFieldStateID).unsigned().notNullable().references('id').inTable('states').onDelete('CASCADE')
      table.string(this.tableFieldName).notNullable()
      table.timestamp(this.tableFieldUpdatedAt).nullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
