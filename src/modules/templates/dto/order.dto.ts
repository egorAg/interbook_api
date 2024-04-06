import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({
    description: 'Order for questions',
    example: ['uuid1', 'uuid3', 'uuid2'],
  })
  @IsNotEmpty()
  @IsString({ each: true })
  order: string[];

  @ApiProperty({
    description: 'Template id',
    example: 'some-uuid-v4-here',
  })
  templateId: string;
}
