const Joi = require("joi")

const heroSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    alterName: Joi.string().required(),
    alliance: Joi.array(),
    imageUrl: Joi.string().required()
})

module.exports = {
    heroSchema
}