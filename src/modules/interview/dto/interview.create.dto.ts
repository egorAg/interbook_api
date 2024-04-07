import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class InterviewCreateDto {
  @ApiProperty({
    type: 'date',
    example: new Date(),
    nullable: true,
  })
  date?: Date;

  @ApiProperty({
    type: 'string',
    example: 'template-uuid-v4-here',
  })
  @IsNotEmpty()
  @IsUUID('4')
  templateId: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  candidateId: number;
}
