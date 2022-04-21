import { RequestBodySchema } from '@/middlewares/validation.middleware'
import { ValidatedRequest } from 'express-joi-validation'
import Joi from 'joi'

export const signupQuerySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export type SignupRequest = ValidatedRequest<RequestBodySchema<{ email: string; password: string }>>

export const loginQuerySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export type LoginRequest = ValidatedRequest<RequestBodySchema<{ email: string; password: string }>>
