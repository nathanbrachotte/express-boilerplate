import { app } from '@/app'
import { NODE_ENV, PORT } from '@/config'
import { logger } from '@/utils/logger'
import validateEnv from '@utils/validateEnv'

validateEnv()

app.listen(PORT, () => {
  logger.info(`=================================`)
  logger.info(`======= ENV: ${NODE_ENV} =======`)
  logger.info(`🚀 App listening on the port ${PORT}`)
  logger.info(`=================================`)
})
