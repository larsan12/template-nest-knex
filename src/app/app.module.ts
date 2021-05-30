import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { SomeModule } from '../some-module/some-module.module'
import { AppController } from './app.controller'

@Module({
  imports: [HttpModule, ConfigModule, SomeModule],
  controllers: [AppController]
})
export class ApplicationModule {}
