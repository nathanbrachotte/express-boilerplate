import { app } from '@/app'
import request from 'supertest'

describe('Testing [app]', () => {
  describe('GET /', function () {
    it('hello world', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({ data: 'Hello world!' })
    })
  })
})
