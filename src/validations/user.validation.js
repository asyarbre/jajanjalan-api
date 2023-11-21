const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "penjual").required(),
  password: Joi.string().required(),
});

exports.validateLogin = validator(loginSchema);
exports.validateRegister = validator(registerSchema);