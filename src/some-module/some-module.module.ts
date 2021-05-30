import { HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '../config/config.service'
import { DatabaseModule } from '../database/database.module'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'


@Module({
  imports: [
    DatabaseModule.forRoot(), HttpModule
  ],
  controllers: [UserController],
  providers: [
    ConfigService,
    UserService
  ],
  exports: [UserService]
})
export class SomeModule {
}
