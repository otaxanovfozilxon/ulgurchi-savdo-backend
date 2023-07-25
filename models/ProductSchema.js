const mongoose = require("mongoose")
const Joi = require("joi")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    about: {
        type: String,
        required: true
    },

    urls: {
        type: Array,
        required: true
    }
})

const Products = mongoose.model("product", productSchema)

const validateProduct = (body) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        about: Joi.string().required(),
        urls: Joi.array().required()
    })

    return schema.validate(body)
}

module.exports = { Products, validateProduct }