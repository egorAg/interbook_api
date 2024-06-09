import { Controller, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../decorators/auth.decorator';
import { UserId } from '../../../../decorators/userid.decorator';
import { ChangeVisibilityUsecase } from './change-visibility.usecase';

@Auth
@ApiTags('Interview')
@Controller('interview')
export class ChangeVisibilityController {
  constructor(private readonly usecase: ChangeVisibilityUsecase) {}

  @ApiOperation({
    summary: 'Make result public',
    description:
      'If result set to public - everyone can get access for result by interviewId',
  })
  @ApiQuery({
    name: 'id',
    type: 'string',
    required: true,
    example: 'some-uuid-v4-here',
  })
  @ApiQuery({
    name: 'visibility',
    type: 'boolean',
    required: true,
    example: true,
  })
  @Patch('visibility')
  public execute(
    @Query('id') id: string,
    @Query('visibility') visibility: boolean,
    @UserId() userId: number,
  ) {
    return this.usecase.execute({
      id: id,
      visibility: visibility,
      requestUserId: userId,
    });
  }
}
