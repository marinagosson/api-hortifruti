import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({trim: true}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    email: schema.string({trim: true}, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({table: 'users', column: 'email'})
    ]),
    password: schema.string({}, [
      rules.minLength(6),
      rules.maxLength(180),
      rules.confirmed('passwordConfirmation')
    ]),
    phone: schema.string({}, [
      rules.mobile({
        locale: ["pt-BR"]
      }),
      rules.maxLength(15)
    ])
  })

  public messages: CustomMessages = {
    required: "{{ field }} is required for register",
    "email.required": "{{ field }} is required for register",
    "email.unique": "{{ field }} must be unique",
    "password.minLength" : "{{ field }} must be at least 6 characters",
    "password.maxLength" : "{{ field }} must be at least 180 characters",
    "phone.mobile" : "{{ field }} must be phone valid"
  }
}
