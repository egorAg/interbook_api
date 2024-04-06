import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { UpdateUsecase } from './update.usecase';
import { UpdateCandidateDto } from '../../dto/update.candidate.dto';
import { Candidate } from '../../domain/types/candidate';

@Auth
@ApiTags('Candidates')
@Controller('candidates')
export class UpdateController {
  constructor(private readonly usecase: UpdateUsecase) {}

  @ApiOperation({
    summary: 'Update candidate',
    description:
      'This handle will update candidate by id, and returns the updated one',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Candidate,
  })
  @HttpCode(HttpStatus.OK)
  @Patch()
  public update(@Body() payload: UpdateCandidateDto) {
    return this.usecase.execute({ dto: payload });
  }
}
