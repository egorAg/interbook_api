import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class QuestionFilterDto {
  @ApiProperty({
    required: false,
    description: 'The name of the question to search for.',
    example: 'How to use NestJS',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    type: [Number],
    description: 'An array of tag IDs to filter questions by.',
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  tagIds?: number[];

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'Show only public or private questions (for current user)',
    example: true,
  })
  @IsBoolean()
  isPublic: boolean;

  userId: number;

  @ApiProperty({
    required: true,
    type: Number,
    minimum: 1,
    description: 'The page number of the paginated results.',
    example: 1,
  })
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    required: true,
    type: Number,
    minimum: 1,
    description: 'The size of each page in the paginated results.',
    example: 10,
  })
  @IsInt()
  @Min(1)
  pageSize: number;
}
