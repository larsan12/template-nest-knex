import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { UserService } from '../services/user.service'
import { UserCreateDto, UserDto } from '../dto/users'

@ApiTags('user')
@Controller('v1/user')
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) {}

  @Get('/:id')
  @ApiOkResponse({ type: UserDto })
  async get(@Param('id') id: string) {
    return this.userService.get(id)
  }

  @Get('/')
  @ApiOkResponse({ type: UserDto, isArray: true })
  async getAll() {
    return this.userService.getAll()
  }

  @Post('/create')
  @ApiOkResponse({ type: UserDto })
  async createUser(@Body() user: UserCreateDto) {
    return this.userService.create(user)
  }
}
