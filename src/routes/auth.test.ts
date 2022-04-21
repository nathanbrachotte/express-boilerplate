import { app } from '@/app'
import request from 'supertest'
jest.mock('@/utils/createCookie', () => {
  return {
    createCookie: jest.fn(() => 'myDeliciousCookie'),
  }
})

jest.mock('jsonwebtoken', () => {
  return {
    verify: async () => ({ id: '0' }),
    sign: () => 'myToken',
  }
})

jest.mock(
  '@/models/users.model.json',
  () => {
    return {
      '0': {
        email: 'example1@email.com',
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

  describe('[POST] /signUp', function () {
    it('works for new users', async () => {
      const response = await request(app).post('/signup').send({
        email: 'test@email.com',
        password: 'password',
      })
      expect(response.statusCode).toBe(201)
      expect(response.body).toStrictEqual({
        message: 'User successfully created',
      })
    })
    it('fails for existing users', async () => {
      const failedResponse = await request(app).post('/signup').send({
        email: 'example1@email.com',
        password: 'password',
      })
      expect(failedResponse.statusCode).toBe(409)
      expect(failedResponse.body).toStrictEqual({
        message: 'Your email example1@email.com already exists',
      })
    })
    it('fails when wrong params are passed', async () => {
      const failedResponse = await request(app).post('/signup').send({
        email: 'example1@email.com',
      })
      expect(failedResponse.statusCode).toBe(400)
      expect(failedResponse.body).toStrictEqual({})
    })
  })

  describe('[POST] /login', function () {
    it('sets a cookie if users exists', async () => {
      const response = await request(app).post('/login').send({
        email: 'example1@email.com',
        password: 'password',
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({ message: 'Login Successful' })

      const setCookie = response.header['set-cookie'][0]
      expect(setCookie).toBeDefined()
    })
    it("sends an error if user doesn't exist", async () => {
      const secondResponse = await request(app).post('/login').send({
        email: 'doesntexist@email.com',
        password: 'password',
      })
      expect(secondResponse.statusCode).toBe(409)
      expect(secondResponse.body).toStrictEqual({
        message: 'Your email doesntexist@email.com was not found',
      })
    })
    it('sends an error if password is wrong', async () => {
      const secondResponse = await request(app).post('/login').send({
        email: 'example1@email.com',
        password: 'wrongpasseword',
      })
      expect(secondResponse.statusCode).toBe(409)
      expect(secondResponse.body).toStrictEqual({
        message: 'Your password is incorrect',
      })
    })
  })

  describe('[POST] /logout', function () {
    it('sets the cookie to null', async () => {
      const loginResponse = await request(app).post('/login').send({
        email: 'example1@email.com',
        password: 'password',
      })

      const cookie = loginResponse.header['set-cookie'][0]
      expect(cookie).toBeDefined()

      const response = await request(app)
        .post('/logout')
        .set('Authorization', 'Bearer myDeliciousCookie')

      expect(response.statusCode).toBe(200)
      const emptyCookie = response.header['set-cookie'][0]
      expect(emptyCookie).toStrictEqual('Authorization=; Max-age=0')
    })
  })
})
