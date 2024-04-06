import { CandidateGradeEnum } from '../../types/candidate.grade.enum';
import { User } from '../../../user/types/user.type';
import { ApiProperty } from '@nestjs/swagger';

export class Candidate {
  @ApiProperty({
    example: 'some-uuid-v4-here',
  })
  id: number;

  @ApiProperty({
    example: 'Leonid',
  })
  name: string;

  @ApiProperty({
    example: 'Romanov',
  })
  surname: string;

  @ApiProperty({
    example: 'iOS',
  })
  specialty: string;

  @ApiProperty({
    example: CandidateGradeEnum.UNGRADED,
  })
  grade: CandidateGradeEnum;

  @ApiProperty({
    example: 85000.0,
  })
  salary?: number;

  @ApiProperty({
    example: '5 years',
  })
  experience?: string;

  createdBy?: User;

  @ApiProperty({
    example: new Date(),
  })
  createdAt?: Date;

  @ApiProperty({
    example: new Date(),
  })
  updatedAt?: Date;
}
