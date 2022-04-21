import { createValidator, ValidatedRequestSchema } from 'express-joi-validation'

const validator = createValidator({})

//! Reminder: req.params is route parameters, req.body is the actual body of the request, and req.query is any query parameters.
export const validationQueryMiddleware = expectedJoiSchema => validator.query(expectedJoiSchema)
export const validationBodyMiddleware = expectedJoiSchema => validator.body(expectedJoiSchema)
export const validationParamsMiddleware = expectedJoiSchema => validator.params(expectedJoiSchema)

export interface RequestBodySchema<expectedJoiSchema> extends ValidatedRequestSchema {
  body: expectedJoiSchema
}

export interface RequestParamsSchema<expectedJoiSchema> extends ValidatedRequestSchema {
  params: expectedJoiSchema
}

export interface RequestQuerySchema<expectedJoiSchema> extends ValidatedRequestSchema {
  query: expectedJoiSchema
}
