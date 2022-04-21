import { logIn, logOut, signUp } from '@/controllers/auth.controller'
import { isUserAuthenticatedMiddleware } from '@/middlewares/auth.middleware'
import { loginQuerySchema, signupQuerySchema } from '@/schema/auth.schema'
import { validationBodyMiddleware } from '@middlewares/validation.middleware'
import { Router } from 'express'

const PATH = '/'
const router = Router()

router.post(`${PATH}signup`, validationBodyMiddleware(signupQuerySchema), signUp)
router.post(`${PATH}login`, validationBodyMiddleware(loginQuerySchema), logIn)
router.post(`${PATH}logout`, isUserAuthenticatedMiddleware, logOut)

export { router }
