import { config } from 'dotenv'

const envs = {
  PORT: process.env.PORT || '3000',
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '123456',
  POSTGRES_DB: process.env.POSTGRES_DB || 'test',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
  POSTGRES_HOST: process.env.POSTGRES_HOST || '127.0.0.1'
}

export class ConfigService {
  readonly envs: typeof envs
  readonly dbName: string

  constructor (dbName?: string) {
    config()
    if (dbName) {
      this.dbName = dbName
    }
    this.envs = envs
  }

  getPort () {
    return Number(this.envs.PORT)
  }

  getPgOptions () {
    return {
      host: this.envs.POSTGRES_HOST,
      port: Number(this.envs.POSTGRES_PORT),
      user: this.envs.POSTGRES_USER,
      password: this.envs.POSTGRES_PASSWORD,
      database: this.dbName || this.envs.POSTGRES_DB,
    }
  }
}
