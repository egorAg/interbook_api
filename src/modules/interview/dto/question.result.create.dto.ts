import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class QuestionResultCreateDto {
  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  @IsUUID('4')
  @IsNotEmpty()
  interviewId: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  questionId: number;

  @ApiProperty({
    type: 'number',
    maximum: 10,
    minimum: 1,
    example: 9,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  @Min(1)
  rate: number;

  @ApiProperty({
    type: 'string',
    example: 'Кандидат не смог полноценно ответить на вопрос',
  })
  @IsOptional()
  @IsString()
  interviewNote?: string;
}
