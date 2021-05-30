import { Inject } from '@nestjs/common'
import { DB_CON_TOKEN, Tables } from '../../common/constants'
import { UserCreateDto } from '../dto/users'
import { Knex } from 'knex'


export class UserService {
  constructor (
    @Inject(DB_CON_TOKEN) readonly knex: Knex
  ) {}

  async get(userId: string) {
    const res = await this.knex(Tables.Users)
      .select('*')
      .where({id: userId})
    return res.length && res[0]
  }

  async getAll() {
    return this.knex(Tables.Users)
      .select('*')
  }

  async create(user: UserCreateDto): Promise<any> {
    return this.knex(Tables.Users)
      .insert({ email: user.email })
      .returning('*')
  }
}
