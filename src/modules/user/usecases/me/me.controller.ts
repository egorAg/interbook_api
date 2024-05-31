import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { MeUsecase } from './me.usecase';
import { UserId } from '../../../../decorators/userid.decorator';

@Auth
@ApiTags('User')
@Controller('user')
export class MeController {
  constructor(private readonly usecase: MeUsecase) {}

  @ApiOperation({
    summary: 'Return current user information',
    description:
      'Use this handle to get current user information, expect password and refresh token',
  })
  @Get('/me')
  public async execute(@UserId() userId: number) {
    return this.usecase.execute(userId);
  }
}
