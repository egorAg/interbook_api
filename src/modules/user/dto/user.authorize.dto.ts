import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthorizeDto {
  @ApiProperty({
    type: 'string',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'МойМармеладныйЯНеТвоя123!',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
