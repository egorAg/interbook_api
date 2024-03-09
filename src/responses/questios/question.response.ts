import { ApiProperty } from '@nestjs/swagger';

export class QuestionResponse {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: 'How to use NestJs with Typeorm',
  })
  name: string;

  @ApiProperty({
    type: 'array',
    example: [{ id: 1, name: 'React' }],
  })
  tags: any;
}
