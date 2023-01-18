import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({trim: true}, [
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({table: 'cities', column: 'name'})
    ]),
    state_id: schema.string(),
    active: schema.boolean()
  })

  public messages: CustomMessages = {
    required: "{{ field }} is required for register",
    "name.required": "{{ field }} is required for register",
    "name.unique": "{{ field }} must be unique",
    "state_id" : "{{ field }} can't be null"
  }
}
