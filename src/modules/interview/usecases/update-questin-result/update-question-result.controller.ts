import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionResultUpdateDto } from '../../dto/question-result.update.dto';
import { UserId } from '../../../../decorators/userid.decorator';
import { InterviewResult } from '../../domain/types/interview.result';
import { UpdateQuestionResultUsecase } from './update-question-result.usecase';

@Auth
@ApiTags('Interview')
@Controller('interview')
export class UpdateQuestionResultController {
  constructor(private readonly usecase: UpdateQuestionResultUsecase) {}
  @ApiOperation({
    summary: 'Update question result',
    description:
      'Update question result, works only if interview status is in progress',
  })
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Patch('update-question-result')
  public async execute(
    @Body() dto: QuestionResultUpdateDto,
    @UserId() user: number,
  ): Promise<InterviewResult> {
    return this.usecase.execute({ requestUserId: user, payload: dto });
  }
}
