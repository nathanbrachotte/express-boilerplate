import { HttpException } from '@/exceptions/HttpException'
import userModel from '@/models/users.model.json'
import { GetUserByIdRequest, UpdateUserRequest } from '@/schema/user.schema'
import { User } from '@/types/users.interface'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export const USERS_PATH = path.join(__dirname, '..', 'models/users.model.json')

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      data: userModel,
      message: 'Request successful',
    })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (
  req: GetUserByIdRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = Number(req.params.id)
    const foundUser: User = userModel[userId]

    if (!foundUser) {
      throw new HttpException(404, 'User not found')
    }

    res.status(200).json({ data: foundUser, message: 'Request successful' })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  req: UpdateUserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.id
    const newUserData = req.body

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { [userId]: targetedUser, ...rest } = userModel

    if (!targetedUser) {
      throw new HttpException(404, 'User not found')
    }

    const updateTargetedUser = {
      ...targetedUser,
      ...newUserData,
    }
    fs.writeFile(
      USERS_PATH,
      JSON.stringify({ ...rest, [userId.toString()]: { ...updateTargetedUser } }, null, 2),
      function writeJSON(err) {
        if (err) {
          throw new HttpException(500, 'Internal server error')
        }
      },
    )

    res.status(200).json({ message: 'User correctly updated' })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.id

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { [userId]: targetedUser, ...rest } = userModel

    if (!targetedUser) {
      throw new HttpException(404, 'User not found')
    }
    fs.writeFile(USERS_PATH, JSON.stringify(rest, null, 2), function writeJSON(err) {
      if (err) throw new HttpException(500, 'Internal server error')
    })

    res.status(200).json({ message: 'User successfully deleted' })
  } catch (error) {
    next(error)
  }
}
