import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The name of the question.',
    example: 'How to use NestJS with TypeORM?',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'An array of tag IDs associated with the question.',
    example: [1, 2],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  tagIds: number[];
}
