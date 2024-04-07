import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Param, Patch } from '@nestjs/common';
import { ChangeVisibilityUsecase } from './change-visibility.usecase';
import { UserId } from '../../../../decorators/userid.decorator';

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
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: 'some-uuid-v4-here',
  })
  @ApiParam({
    name: 'visibility',
    type: 'boolean',
    required: true,
    example: true,
  })
  @Patch('visibility')
  public execute(
    @Param('id') id: string,
    @Param('visibility') visibility: boolean,
    @UserId() userId: number,
  ) {
    return this.usecase.execute({
      id: id,
      visibility: visibility,
      requestUserId: userId,
    });
  }
}
