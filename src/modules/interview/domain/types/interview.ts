import { ApiProperty } from '@nestjs/swagger';
import { Candidate } from '../../../candidates/domain/types/candidate';
import { TemplateEntity } from '../../../templates/entities/models/template.entity';
import { UserModel } from '../../../user/entities/models/user.model';
import { User } from '../../../user/types/user.type';
import { InterviewStatusEnum } from '../../types/interview-status.enum';
import { InterviewResult } from './interview.result';

export class Interview {
  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  id: string;
  @ApiProperty({
    type: 'boolean',
    example: false,
  })
  isResultPublished: boolean;

  @ApiProperty({
    type: 'string',
    example: InterviewStatusEnum.IN_PROGRESS,
    enum: [
      InterviewStatusEnum.PLANNED,
      InterviewStatusEnum.IN_PROGRESS,
      InterviewStatusEnum.FINISHED,
    ],
  })
  status: InterviewStatusEnum;

  @ApiProperty({
    type: TemplateEntity,
    example: TemplateEntity,
  })
  template: TemplateEntity;

  @ApiProperty({
    type: InterviewResult,
    example: InterviewResult,
    isArray: true,
  })
  result: InterviewResult[];

  @ApiProperty({
    type: Candidate,
    example: Candidate,
  })
  candidate: Candidate;

  @ApiProperty({
    type: UserModel,
    example: new UserModel(),
  })
  user: User;

  @ApiProperty({ type: 'date', example: new Date() })
  date: Date;

  @ApiProperty({
    type: 'string',
    example:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, in.',
  })
  finalFeedback: string;
}
