import { app } from '@/app'
import userModel from '@/models/users.model.json'
import request from 'supertest'

jest.mock(
  '@/models/users.model.json',
  () => {
    return {
      '0': {
        email: 'example1@email.com',
        password: '$2b$10$/ad66sHsyzXuJ/mhS4P6BuQ1DpcaGNSCeb4NpnGRxyc5EQw2PbnfS',
      },
      '1': {
        email: 'example2@email.com',
        password: '$2b$10$/ad66sHsyzXuJ/mhS4P6BuQ1DpcaGNSCeb4NpnGRxyc5EQw2PbnfS',
      },
      '2': {
        email: 'example3@email.com',
        password: '$2b$10$/ad66sHsyzXuJ/mhS4P6BuQ1DpcaGNSCeb4NpnGRxyc5EQw2PbnfS',
      },
      '3': {
        email: 'example4@email.com',
        password: '$2b$10$/ad66sHsyzXuJ/mhS4P6BuQ1DpcaGNSCeb4NpnGRxyc5EQw2PbnfS',
      },
      '4': {
        email: 'example5@email.com',
        password: '$2b$10$/ad66sHsyzXuJ/mhS4P6BuQ1DpcaGNSCeb4NpnGRxyc5EQw2PbnfS',
      },
    }
  },
  { virtual: true },
)

describe('Testing [users] routes', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('[GET] /users', function () {
    it('returns all users', async () => {
      const response = await request(app).get('/users')
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({ data: userModel, message: 'Request successful' })
    })
  })
  describe('[GET] /users/:id', function () {
    it('returns all users', async () => {
      const response = await request(app).get('/users/1')
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({ data: userModel['1'], message: 'Request successful' })
    })
  })

  describe('[PUT] /users/:id', function () {
    it('returns all users', async () => {
      const response = await request(app).put('/users/1').send({
        email: 'test@email.com',
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({
        message: 'User correctly updated',
      })
    })
  })

  describe('[DELETE] /users/:id', function () {
    it('returns all users', async () => {
      const response = await request(app).delete('/users/1').send({
        email: 'test@email.com',
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({
        message: 'User successfully deleted',
      })
    })
  })
})
