import { Interview } from './interview';
import { QuestionModel } from '../../../questions/entities/models/question.model';
import { ApiProperty } from '@nestjs/swagger';

export class InterviewResult {
  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  id: string;

  @ApiProperty({
    type: QuestionModel,
    example: new QuestionModel(),
  })
  question: QuestionModel;

  interview: Interview;

  @ApiProperty({
    type: 'number',
    example: 9,
    minimum: 1,
    maximum: 10,
  })
  rate: number;

  @ApiProperty({
    type: 'string',
    example: 'Some description here',
    nullable: true,
  })
  interviewNote?: string;
}
