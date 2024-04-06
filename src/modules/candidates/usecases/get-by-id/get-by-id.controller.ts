import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../../../decorators/auth.decorator';
import { GetByIdUsecase } from './get-by-id.usecase';
import { Candidate } from '../../domain/types/candidate';
import { NotFoundResponse } from '../../../../responses/errors/not-found.response';

@Auth
@ApiTags('Candidates')
@Controller('candidates')
export class GetByIdController {
  constructor(private readonly usecase: GetByIdUsecase) {}

  @ApiOperation({
    summary: 'Get by id',
    description: 'This handle returns candidate founded by related id',
  })
  @ApiOkResponse({
    type: Candidate,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public execute(@Param('id') id: number) {
    return this.usecase.execute(id);
  }
}
