import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDto {
  @ApiProperty({
    example: 'username@mail.com',
  })
  login: string;

  @ApiProperty({
    example: 'qweQWE123!',
  })
  password: string;
}
