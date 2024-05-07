import { Auth } from '../../../../decorators/auth.decorator';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, HttpCode, HttpStatus, Patch, Query } from '@nestjs/common';
import { UpdateInterviewStatusUsecase } from './update-interview-status.usecase';
import { UserId } from '../../../../decorators/userid.decorator';
import { InterviewStatusEnum } from '../../types/interview-status.enum';

@Auth
@ApiTags('Interview')
@Controller('interview')
export class UpdateInterviewStatusController {
  constructor(private readonly usecase: UpdateInterviewStatusUsecase) {}

  @ApiOperation({
    summary: 'Update interview status',
    description:
      'Use this handle to update interview status. Notice, only when status set to IN_PROGRESS you can update data in interview',
  })
  @ApiOkResponse({
    type: 'string',
  })
  @ApiQuery({
    name: 'id',
    type: 'string',
  })
  @ApiQuery({
    name: 'status',
    type: 'enum',
    enum: [
      InterviewStatusEnum.PLANNED,
      InterviewStatusEnum.IN_PROGRESS,
      InterviewStatusEnum.FINISHED,
    ],
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/status')
  execute(
    @Query('id') id: string,
    @Query('status') status: InterviewStatusEnum,
    @UserId() userId: number,
  ) {
    return this.usecase.execute({ requestUserId: userId, status, id });
  }
}
