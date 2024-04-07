import { CandidateGradeEnum } from '../../types/candidate.grade.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Interview } from '../../../interview/domain/types/interview';
import { UserModel } from '../../../user/entities/models/user.model';

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

  @ApiProperty({
    example: [],
  })
  interviews: Interview[];

  createdBy?: UserModel;

  @ApiProperty({
    example: new Date(),
  })
  createdAt?: Date;

  @ApiProperty({
    example: new Date(),
  })
  updatedAt?: Date;
}
