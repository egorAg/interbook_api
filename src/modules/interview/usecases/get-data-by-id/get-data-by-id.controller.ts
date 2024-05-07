import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { GetDataByIdUsecase } from './get-data-by-id.usecase';
import { UserId } from '../../../../decorators/userid.decorator';

@ApiTags('Interview')
@Controller('interview')
export class GetDataByIdController {
  constructor(private readonly useCase: GetDataByIdUsecase) {}

  @Get(':id')
  public execute(@Param('id') id: string, @UserId() userId: number) {
    return this.useCase.execute({ id: id, requestUserId: userId });
  }
}
