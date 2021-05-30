// tslint:disable:max-classes-per-file
import { IsEmail, IsString } from 'class-validator'


export class UserCreateDto {
  @IsEmail()
  email: string
}

export class UserDto {
  @IsString()
  id: string

  @IsEmail()
  email: string
}