import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'
  protected tableFieldID = 'id'
  protected tableFieldName = 'name'
  protected tableFieldDescription = 'description'
  protected tableFieldPosition = 'position'
  protected tableFieldActive = 'active'
  protected tableFieldDeletedAt = 'deleted_at'
  protected tableFieldEstablishmentID = 'establishment_id'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldID).primary()
      table.string(this.tableFieldName).notNullable()
      table.string(this.tableFieldDescription).nullable()
      table.string(this.tableFieldPosition).notNullable()
      table.string(this.tableFieldActive).notNullable().defaultTo(true)
      table.integer(this.tableFieldEstablishmentID).notNullable().unsigned().references('id').inTable('establishments').onDelete('RESTRICT')
      table.timestamps(true, true)
      table.timestamp(this.tableFieldDeletedAt).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
