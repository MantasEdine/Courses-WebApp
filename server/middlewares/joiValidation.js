const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(20),
  number: Joi.number(),
});

function joiValidation(data) {
  const { error } = schema.validate(data);
  return error;
}
module.exports = { joiValidation };
