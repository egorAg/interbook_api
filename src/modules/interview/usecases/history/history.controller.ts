import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HistoryUsecase } from './history.usecase';
import { UserId } from '../../../../decorators/userid.decorator';
import { Interview } from '../../domain/types/interview';

@Auth
@ApiTags('Interview')
@Controller('interview/history')
export class HistoryController {
  constructor(private readonly usecase: HistoryUsecase) {}

  @ApiOperation({
    summary: 'Get all interviews for current user',
    description:
      'This handle returns all registered interviews for currently authorized user',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: Interview,
    isArray: true,
  })
  @Get('/all-interviews')
  public execute(@UserId() id: number) {
    console.log(id);
    return this.usecase.execute({ userId: id });
  }
}
