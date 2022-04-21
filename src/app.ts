import { router as authRouter } from '@/routes/auth.route'
import { router as userRouter } from '@/routes/users.route'
import validateEnv from '@/utils/validateEnv'
import { CREDENTIALS, LOG_FORMAT, ORIGIN } from '@config'
import errorMiddleware from '@middlewares/error.middleware'
import { stream } from '@utils/logger'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'

const app = express()

validateEnv()

app.use(morgan(LOG_FORMAT, { stream }))
app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }))
app.use(hpp())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ data: 'Hello world!' })
})

app.use(userRouter)
app.use(authRouter)

// ERROR HANDLING
app.use(errorMiddleware)

export { app }
