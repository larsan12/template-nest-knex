import { HttpModule, INestApplication } from '@nestjs/common'
import {Test, TestingModule} from '@nestjs/testing'
import * as request from 'supertest'
import { ConfigService } from '../src/config/config.service'
import { DatabaseModule } from '../src/database/database.module'
import { UserController } from '../src/some-module/controllers/user.controller'
import { UserService } from '../src/some-module/services/user.service'
import { expect } from 'chai';

import { createDb, dropDb } from './helper'

const DB_NAME = `test_db_${Date.now()}`


describe('AppController', () => {
  let app: INestApplication
  let userService: UserService

  before(async () => {
    await createDb(DB_NAME)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, DatabaseModule.forRoot(DB_NAME)],
      controllers: [ UserController ],
      providers: [
        ConfigService,
        UserService,
      ]
    }).compile()

    userService = moduleFixture.get<UserService>(UserService)

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/test', async () => {
    const email = 'tes1t@test.com'

    const response = await request(app.getHttpServer())
      .post('/v1/user/create')
      .send({ email })

    if (response.statusCode !== 200 && response.statusCode !== 201) {
      throw new Error(JSON.stringify(response.body))
    }
    const user = await userService.get(response.body.id)

    if (!user) {
      throw new Error('err')
    } else {
      expect(user.email).equal(email)
      expect(user.id).equal(response.body.id)
    }
  })

  after(async () => {
    await app.close()
    await dropDb(DB_NAME)
  })
})
