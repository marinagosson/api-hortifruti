import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    city_id: schema.number([
      rules.exists({ 
        table: "cities", 
        column: "id" 
      }),
    ]),
    street: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    number: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(20),
    ]),
    neighborhood: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    referencePoint: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
    complement: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
  });

  public messages: CustomMessages = {};
}
