import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CandidateCreateUsecase } from './candidate.create.usecase';
import { CreateCandidateDto } from '../../dto/create.candidate.dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { UserId } from '../../../../decorators/userid.decorator';
import { Candidate } from '../../domain/types/candidate';

@Auth
@ApiTags('Candidates')
@Controller('candidates')
export class CandidateCreateController {
  constructor(private readonly useCase: CandidateCreateUsecase) {}

  @ApiOperation({
    summary: 'Create new candidate',
    description:
      'This method create new candidate, and relate it with current authorized user',
  })
  @ApiOkResponse({
    type: Candidate,
    description: 'Created successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  execute(@Body() payload: CreateCandidateDto, @UserId() userId: number) {
    return this.useCase.execute({
      dto: payload,
      userId: userId,
    });
  }
}
