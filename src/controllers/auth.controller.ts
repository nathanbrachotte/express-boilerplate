import { HttpException } from '@/exceptions/HttpException'
import userModel from '@/models/users.model.json'
import { LoginRequest, SignupRequest } from '@/schema/auth.schema'
import { RequestWithUser } from '@/types/auth.interface'
import { User } from '@/types/users.interface'
import { createCookie } from '@/utils/createCookie'
import { createToken } from '@/utils/createToken'
import { compare, hash } from 'bcrypt'
import { NextFunction, Response } from 'express'
import fs from 'fs'
import path from 'path'

export const USERS_PATH = path.join(__dirname, '..', 'models/users.model.json')

export const signUp = async (
  req: SignupRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userData = req.body

    const foundUserKey = Object.keys(userModel).find(
      index => userModel[index].email === userData.email,
    )

    if (foundUserKey) {
      throw new HttpException(409, `Your email ${userData.email} already exists`)
    }

    const hashedPassword = await hash(userData.password, 10)
    const lastUserKey = parseInt(Object.keys(userModel).slice(-1)[0])

    fs.writeFile(
      USERS_PATH,
      JSON.stringify(
        {
          ...userModel,
          [(lastUserKey + 1).toString()]: {
            email: userData.email,
            password: hashedPassword,
          },
        },
        null,
        2,
      ),
      function writeJSON(err) {
        if (err) {
          throw new HttpException(500, 'Internal server error')
        }
      },
    )

    res.status(201).json({ message: 'User successfully created' })
  } catch (error) {
    next(error)
  }
}

export const logIn = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userData = req.body

    //* Types could be improved
    const foundUserId = Object.keys(userModel).find(
      index => userModel[index].email === userData.email,
    )
    const user: User = userModel[foundUserId]

    if (!user) {
      throw new HttpException(409, `Your email ${userData.email} was not found`)
    }

    const isPasswordMatching = await compare(userData.password, user.password)

    if (!isPasswordMatching) {
      throw new HttpException(409, 'Your password is incorrect')
    }

    const tokenData = createToken(foundUserId)
    const cookie = createCookie(tokenData)

    res.setHeader('Set-Cookie', [cookie])
    res.status(200).json({ message: 'Login Successful' })
  } catch (error) {
    next(error)
  }
}

export const logOut = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userData = res.locals

    const foundUser = Object.keys(userModel).find(
      index => userModel[index].email === userData.email,
    )
    const user: User = userModel[foundUser]

    if (!user) throw new HttpException(401, 'Could not authenticate user')

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    next(error)
  }
}
