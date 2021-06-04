const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;


module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный Email для обновления');
    }),
  }),
});


module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный Email для логина');
    }),
    password: Joi.string().required().min(3),
  }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validateAuth = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});
