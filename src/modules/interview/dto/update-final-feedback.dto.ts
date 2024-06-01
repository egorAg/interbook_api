/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class UpdateFinalFeedbackDto {
  @ApiProperty({
    name: 'interviewId',
    type: 'string',
    example: 'some uuid v4 here',
  })
  @IsUUID('4')
  interviewId: string;

  @ApiProperty({
    name: 'finalFeedback',
    type: 'string',
    example: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus molestias esse voluptatibus repellendus quam rem laboriosam, dignissimos iure accusamus sunt.'
  })
  finalFeedback: string;
}