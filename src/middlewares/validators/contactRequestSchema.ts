import Joi from "joi";

/**
 * Contact Group Post body validation Joi schema
 */
export const contactGroup = Joi.object({
    name: Joi.string()
        .required(),
    description: Joi.string()
        .required()
})