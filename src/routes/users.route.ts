import {
  validationBodyMiddleware,
  validationParamsMiddleware
} from '@/middlewares/validation.middleware'
import { getUserByIdParamsSchema, updateUserBodySchema } from '@/schema/user.schema'
import { deleteUser, getUserById, getUsers, updateUser } from '@controllers/users.controller'
import { Router } from 'express'

const PATH = '/users'
const router = Router()

router.get(`${PATH}`, getUsers)
router.get(`${PATH}/:id(\\d+)`, validationParamsMiddleware(getUserByIdParamsSchema), getUserById)
router.put(
  `${PATH}/:id(\\d+)`,
  validationParamsMiddleware(getUserByIdParamsSchema),
  validationBodyMiddleware(updateUserBodySchema),
  updateUser,
)
router.delete(`${PATH}/:id(\\d+)`, deleteUser)

export { router }
