import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'
  protected tableFieldID = 'id'
  protected tableFieldClientID = 'client_id'
  protected tableFieldCityID = 'city_id'
  protected tableFieldStreet = 'street'
  protected tableFieldNumber = 'number'
  protected tableFieldNeighborhood = 'neighborhood'
  protected tableFieldComplement = 'complement'
  protected tableFieldReferencePoint = 'reference_point'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments(this.tableFieldID)
      table.integer(this.tableFieldClientID).notNullable().unsigned().references('id').inTable('clients')
      table.integer(this.tableFieldCityID).notNullable().unsigned().references('id').inTable('cities')
      table.string(this.tableFieldStreet).notNullable()
      table.string(this.tableFieldNeighborhood).notNullable()
      table.string(this.tableFieldNumber).nullable()
      table.string(this.tableFieldComplement).nullable()
      table.string(this.tableFieldReferencePoint).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
