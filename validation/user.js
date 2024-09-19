const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().required(),
    mid: Joi.string().allow(""),
    last: Joi.string().required(),
  }).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string(),
  address: Joi.object({
    state: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.string().required(),
  }).required(),
  isAdmin: Joi.boolean(),
  isBusiness: Joi.boolean(),
  image: Joi.object({
    url: Joi.string().required(),
    alt: Joi.string().required(),
  }).required(),
});

const updateValidationSchema = Joi.object({
  name: Joi.object({
    first: Joi.string(),
    mid: Joi.string().allow(""),
    last: Joi.string(),
  }).optional(),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string().min(6),
  isBusiness: Joi.boolean(),
  isAdmin: Joi.boolean(),
  image: Joi.object({
    url: Joi.string().required(),
    alt: Joi.string().required(),
  }).required(),
});

module.exports = { userValidationSchema, updateValidationSchema };
