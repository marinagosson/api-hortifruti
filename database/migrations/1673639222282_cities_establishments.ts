import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities_establishments'
  protected tableFieldCityID = 'city_id'
  protected tableFieldEstablishmentID = 'establishment_id'
  protected tableFieldDeliveryCost = 'delivery_cost'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer(this.tableFieldCityID).unsigned().notNullable().references('id').inTable('cities')
      table.integer(this.tableFieldEstablishmentID).unsigned().notNullable().references('id').inTable('establishments')
      table.decimal(this.tableFieldDeliveryCost, 8, 2).notNullable()
      table.primary([this.tableFieldCityID, this.tableFieldEstablishmentID]);

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
