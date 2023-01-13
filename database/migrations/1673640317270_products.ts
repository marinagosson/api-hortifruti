import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'
  protected tableFieldID = 'id'
  protected tableFieldName = 'name'
  protected tableFieldDescription = 'description'
  protected tableFieldPosition = 'position'
  protected tableFieldImage = 'image'
  protected tableFieldPrice = 'price'
  protected tableFieldUnit = 'unit'
  protected tableFieldActive = 'active'
  protected tableFieldDeletedAt = 'deleted_at'
  protected tableFieldCategoryID = 'category_id'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldID)
      table.string(this.tableFieldName).notNullable()
      table.string(this.tableFieldDescription).nullable()
      table.string(this.tableFieldImage).nullable()
      table.decimal(this.tableFieldPrice, 8, 2).notNullable()
      table.string(this.tableFieldUnit, 3).notNullable()
      table.string(this.tableFieldPosition).notNullable()
      table.integer(this.tableFieldCategoryID).notNullable().unsigned().references('id').inTable('categories').onDelete('RESTRICT')
      table.timestamps(true, true)
      table.boolean(this.tableFieldActive).notNullable().defaultTo(true)
      table.timestamp(this.tableFieldDeletedAt).nullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
