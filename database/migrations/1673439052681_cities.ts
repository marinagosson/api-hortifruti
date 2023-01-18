import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities'
  protected tableFieldID = 'id'
  protected tableFieldStateID = 'state_id'
  protected tableFieldName = 'name'
  protected tableFieldUpdatedAt = 'updated_at'
  protected tableFieldActive = 'active'


  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldID)
      table.string(this.tableFieldStateID).notNullable().notNullable().references('id').inTable('states').onDelete('CASCADE')
      table.string(this.tableFieldName).notNullable()
      table.timestamp(this.tableFieldUpdatedAt).nullable();
      table.boolean(this.tableFieldActive).defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
