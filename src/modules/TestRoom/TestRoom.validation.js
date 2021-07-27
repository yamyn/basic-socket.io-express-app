const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    birth_year: Joi.number().integer().min(1900).max(2013),
}).with('username', 'birth_year');

module.exports = {
    getHelloSchema: schema,
};
