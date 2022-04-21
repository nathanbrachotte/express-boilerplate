import { SECRET_KEY } from '@/config'
import { DataStoredInToken, TokenData } from '@/types/auth.interface'
import { sign } from 'jsonwebtoken'

export const createToken = (userId: string): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: parseInt(userId) }
  const secretKey = SECRET_KEY
  const expiresIn = 60 * 60 // 1 hour

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) }
}
