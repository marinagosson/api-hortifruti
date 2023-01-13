import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'states'
  protected tableFieldID = 'id'
  protected tableFieldName = 'name'
  protected tableFieldUF = 'uf'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldID)
      table.string(this.tableName).notNullable()
      table.string(this.tableFieldUF).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
