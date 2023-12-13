const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const penjualSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  lat: Joi.number().required(),
  lon: Joi.number().required(),
  description: Joi.string().required(),
});

exports.validatePenjual = validator(penjualSchema);