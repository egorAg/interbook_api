import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CandidateHistoryUsecase } from './candidate-history.usecase';
import { UserId } from '../../../../decorators/userid.decorator';
import { Interview } from '../../domain/types/interview';

@Auth
@ApiTags('Interview')
@Controller('interview')
export class CandidateHistoryController {
  constructor(private readonly useCase: CandidateHistoryUsecase) {}
  @ApiOperation({
    summary: 'Get candidate interviews',
    description:
      'Return all candidate interviews, registered in system, order by date',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [Interview],
  })
  @HttpCode(HttpStatus.OK)
  @Get('candidate/:id')
  public async execute(
    @Param('id') candidateId: number,
    @UserId() userId: number,
  ) {
    return this.useCase.execute({ candidateId, requestUserId: userId });
  }
}
