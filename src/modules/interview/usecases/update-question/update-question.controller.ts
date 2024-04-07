import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UpdateQuestionUsecase } from './update-question.usecase';
import { QuestionResultCreateDto } from '../../dto/question.result.create.dto';
import { InterviewResult } from '../../domain/types/interview.result';
import { UserId } from '../../../../decorators/userid.decorator';

@Auth
@ApiTags('Interview')
@Controller('interview')
export class UpdateQuestionController {
  constructor(private readonly usecase: UpdateQuestionUsecase) {}

  @ApiOperation({
    summary: 'Add result to interview',
    description:
      'Use this handle to add result by interviewId & questionId right inside the interview result',
  })
  @ApiOkResponse({
    type: InterviewResult,
    isArray: false,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/result')
  execute(@Body() dto: QuestionResultCreateDto, @UserId() id: number) {
    return this.usecase.execute({ dto: dto, requestUserId: id });
  }
}
