const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(20),
  number: Joi.number(),
  price: Joi.number(),
  category: Joi.string().min(3).max(20).required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
});

function joiValidation(data) {
  const { error } = schema.validate(data);
  return error;
}
module.exports = { joiValidation };
