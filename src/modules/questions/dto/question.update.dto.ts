import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    description: 'The id of question to update',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The new name of the question.',
    example: 'How to use NestJS with TypeORM?',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'An array of new tag IDs associated with the question.',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  tagIds?: number[];

  @ApiProperty({
    description: 'The new hint of the question.',
    example: 'How to use NestJS with TypeORM?',
  })
  @IsOptional()
  @IsString()
  hint?: string;
}
