import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { RemoveUsecase } from './remove.usecase';

@Auth
@ApiTags('Candidates')
@Controller('candidates')
export class RemoveController {
  constructor(private readonly usecase: RemoveUsecase) {}

  @ApiOperation({
    summary: 'Delete candidate from system',
    description:
      'This handle totally deletes an candidate by provided id from our system',
  })
  @ApiOkResponse({
    description: 'Deleted',
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  public async execute(@Param('id') id: number) {
    await this.usecase.execute({ id });
  }
}
