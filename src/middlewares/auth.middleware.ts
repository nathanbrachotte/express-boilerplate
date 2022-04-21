import userModel from '@/models/users.model.json'
import { DataStoredInToken, RequestWithUser } from '@/types/auth.interface'
import { User } from '@/types/users.interface'
import { SECRET_KEY } from '@config'
import { HttpException } from '@exceptions/HttpException'
import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const isUserAuthenticatedMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Authorization =
      req.cookies['Authorization'] ||
      (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null)
    if (Authorization) {
      const verificationResponse = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken
      const userId = verificationResponse.id
      const user: User = userModel[userId]

      if (user) {
        res.locals = user
        next()
      } else {
        //* Wrong token was passed
        next(new HttpException(401, 'Could not authenticate user'))
      }
    } else {
      //* No authentication token found
      next(new HttpException(401, 'Could not authenticate user'))
    }
  } catch (error) {
    //* Malformed token
    next(new HttpException(401, 'Could not authenticate user'))
  }
}
