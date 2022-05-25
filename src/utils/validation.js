import Joi from 'joi';

export const validateProduct = (schema) => {
  const joiSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'any.required': `"name" is a required field`,
    }),
    quantity: Joi.number().required().messages({
      'number.base': `quantity should be a type of 'number'`,
      'number.empty': `quantity cannot be an empty field`,
      'any.required': `quantity is a required field`,
    }),
    price: Joi.number().required().messages({
      'number.base': `price should be a type of 'number'`,
      'number.empty': `price cannot be an empty field`,
      'any.required': `price is a required field`,
    }),
    description: Joi.string().required().messages({
      'string.base': `description should be a type of 'text'`,
      'string.empty': `description cannot be an empty field`,
      'any.required': `description is a required field`,
    }),
  });
  const options = {
    abortEarly: false, // include all errors
  };
  return joiSchema.validate(schema, options);
};
