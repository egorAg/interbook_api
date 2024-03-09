import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    name: 'login',
    description: 'used by user to authorize in system',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    name: 'password',
    description: 'used by user to authorize in system',
    example: 'МойМармеладныйЯНеТвоя123!',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
