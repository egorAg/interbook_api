import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetForActiveUserUsecase } from './get-for-active-user.usecase';
import { UserId } from '../../../../decorators/userid.decorator';
import { Candidate } from '../../domain/types/candidate';

@Auth
@ApiTags('Candidates')
@Controller('candidates')
export class GetForActiveUserController {
  constructor(private readonly useCase: GetForActiveUserUsecase) {}

  @ApiOperation({
    summary: 'Get candidates for current user',
    description:
      'This handle returns an already registered candidate to currently authorized user',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [Candidate],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  public execute(@UserId() id: number) {
    return this.useCase.execute({ userId: id });
  }
}
