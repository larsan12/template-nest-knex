import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import * as express from 'express'
import { ApplicationModule } from './app/app.module'
import { ConfigService } from './config/config.service'
import { setupSwagger } from './swagger'

async function bootstrap () {
  const server = express()
  server.disable('x-powered-by')

  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
    new ExpressAdapter(server),
    {
      cors: { origin: ['*'], credentials: true },
    },
  )
  const configService = app.get(ConfigService)

  Logger.log(configService.envs)
  Logger.log(`Starting APP`)

  setupSwagger(app)

  await app.listen(3000)
}

bootstrap().catch((err) => {
  console.error(err)
  process.exit(1)
})
