import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../decorators/auth.decorator';
import { UserId } from '../../../../decorators/userid.decorator';
import { InterviewResult } from '../../domain/types/interview.result';
import { UpdateFinalFeedbackDto } from '../../dto/update-final-feedback.dto';
import { UpdateFinalFeedbackUsecase } from './update-final-feedback.usecase';

@Auth
@ApiTags('Interview')
@Controller('interview')
export class UpdateFinalFeedbackController {
  constructor(private readonly usecase: UpdateFinalFeedbackUsecase) {}

  @ApiOperation({
    summary: 'Update final feedback of the interview',
    description: 'Use this handle to update the final interview feedback',
  })
  @ApiOkResponse({
    type: InterviewResult,
    isArray: false,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/feedback/update')
  execute(@Body() dto: UpdateFinalFeedbackDto, @UserId() id: number) {
    return this.usecase.execute({ dto: dto, requestUserId: id });
  }
}
