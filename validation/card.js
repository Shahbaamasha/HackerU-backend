const Joi = require("joi");
const israeliPhonePattern = /^(?:\+972|0)[2-9]\d{7,8}$/;
const cardValidationSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().pattern(israeliPhonePattern).required(),
  email: Joi.string().email().required(),
  web: Joi.string().uri().optional(),
  image: Joi.object({
    url: Joi.string().uri().required(),
    alt: Joi.string().required(),
  }).required(),
  address: Joi.object({
    state: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.string().required(),
  }).required(),
  likes: Joi.array().items(Joi.string()).optional(),
});

module.exports = { cardValidationSchema };
