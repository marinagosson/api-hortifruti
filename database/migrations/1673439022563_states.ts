import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'states'
  protected tableFieldName = 'name'
  protected tableFieldUF = 'id'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string(this.tableFieldUF).notNullable().unique().primary()
      table.string(this.tableFieldName).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
