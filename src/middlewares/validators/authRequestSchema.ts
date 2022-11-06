import Joi from "joi";

/**
 * User registration body validation Joi schema
 */
export const RegisterUser = Joi.object({
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

/**
 * User login body validation Joi schema
 */
export const LoginUser = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
})

/**
 * Reset user body validation Joi schema
 */
export const ResetUser = Joi.object({
    email: Joi.string()
        .email()
        .required()
})

/**
 * Reset code body validation Joi schema
 */
export const ResetCode = Joi.object({
    code: Joi.string()
        .min(6)
        .required()
})

/**
 * Set new password validation Joi schema
 */
export const SetNewPassword = Joi.object({
    code: Joi.string()
        .min(6)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref('password')
})