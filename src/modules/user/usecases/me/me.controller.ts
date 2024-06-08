import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../decorators/auth.decorator';
import { UserId } from '../../../../decorators/userid.decorator';
import { MeUsecase } from './me.usecase';

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
    console.log(userId);

    return this.usecase.execute(userId);
  }
}
