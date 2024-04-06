import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionCreateDto {
  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  @IsNotEmpty()
  @IsString()
  templateId: string;

  @ApiProperty({
    type: 'number',
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  questionId: number;

  @ApiProperty({
    type: 'string',
    example: 'Это заметка для вопроса',
  })
  @IsOptional()
  @IsString()
  note?: string;
}
