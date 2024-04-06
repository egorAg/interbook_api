import { CandidateGradeEnum } from '../types/candidate.grade.enum';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Leonid',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Romanov',
  })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'iOS development',
  })
  @IsNotEmpty()
  @IsString()
  speciality: string;

  @ApiProperty({
    type: 'string',
    required: false,
    enum: CandidateGradeEnum,
    example: CandidateGradeEnum.JUNIOR,
    default: CandidateGradeEnum.UNGRADED,
  })
  @IsOptional()
  @IsString()
  grade: CandidateGradeEnum;

  @ApiProperty({
    type: 'number',
    required: false,
    example: 85000.0,
  })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '5 years',
  })
  @IsOptional()
  @IsString()
  experience?: string;
}
