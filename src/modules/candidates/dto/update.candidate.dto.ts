import { CandidateGradeEnum } from '../types/candidate.grade.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCandidateDto {
  @ApiProperty({
    example: 1,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Leonid',
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Romanov',
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({
    example: 'iOS',
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  speciality?: string;

  @ApiProperty({
    example: CandidateGradeEnum.UNGRADED,
    type: 'string',
    enum: CandidateGradeEnum,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(CandidateGradeEnum)
  grade?: CandidateGradeEnum;

  @ApiProperty({
    example: 81000.0,
    type: 'number',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty({
    example: '4 years',
    type: 'string',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  experience?: string;
}
