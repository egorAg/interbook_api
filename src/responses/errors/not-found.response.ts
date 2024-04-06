import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({
    example: 'Not found',
  })
  error = 'Not found';
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  code = HttpStatus.NOT_FOUND;
  @ApiProperty({
    example: 'Error description message',
  })
  message: string;
}
