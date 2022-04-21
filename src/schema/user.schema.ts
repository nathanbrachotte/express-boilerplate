import { RequestBodySchema, RequestParamsSchema } from '@/middlewares/validation.middleware'
import { ValidatedRequest } from 'express-joi-validation'
import Joi from 'joi'

export const getUserByIdParamsSchema = Joi.object({
  id: Joi.string().required(),
})

export type GetUserByIdRequest = ValidatedRequest<RequestParamsSchema<{ id: string }>>

// Types could be improved to use key 'body' || 'par–ams' || 'query' to determine the type
export type UpdateUserRequest = ValidatedRequest<
  RequestParamsSchema<{ id: string }> & RequestBodySchema<{ email: string }>
>

export const updateUserBodySchema = Joi.object({
  email: Joi.string().required(),
})
