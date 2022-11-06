import Joi from "joi";

/**
 * Telco Post body validation Joi schema
 */
export const CountrySchema = Joi.object({
    name: Joi.string()
        .required(),
    code: Joi.string()
        .length(3)
        .required()
})

export const CountryUpdateSchema = Joi.object({
    name: Joi.string(),
    code: Joi.string()
        .length(3)
})

/**
 * Country Post body validation Joi schema
 */
export const TelcoSchema = Joi.object({
    name: Joi.string()
        .required(),
    code: Joi.string()
        .length(3)
        .required(),
    country: Joi.string()
        .required()
})

/**
 * Country patch body validation joi schema
 */
export const TelcoUpdateSchema = Joi.object({
    name: Joi.string(),
    code: Joi.string()
        .length(3),
    country: Joi.string()
})

/**
 * Prefix post body validation joi schema
 */
export const PrefixPostSchema = Joi.object({
    prefix: Joi.string()
        .required()
        .length(3),
    telco: Joi.string()
        .required()
})

/**
 * Prefix patch body validation joi schema
 */
export const PrefixUpdateSchema = Joi.object({
    prefix: Joi.string()
        .length(3),
    telco: Joi.string()
})