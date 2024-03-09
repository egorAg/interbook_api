import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Refresh } from 'src/decorators/refresh.decorator';
import { UserId } from 'src/decorators/userid.decorator';
import { UserAuthorizeDto } from 'src/modules/user/dto/user.authorize.dto';
import { UserCreateDto } from 'src/modules/user/dto/user.create.dto';
import { TokenResponse } from 'src/responses/auth/token.response';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    description: 'Authorize existed user',
    summary: 'Authorize user via login and password',
  })
  @ApiOkResponse({
    description: 'Success',
    type: TokenResponse,
  })
  @Post('auth')
  public async signIn(@Body() dto: UserAuthorizeDto) {
    return this.service.authorize(dto);
  }

  @ApiOperation({
    description: 'Register new user',
    summary: 'Register new user via login and password',
  })
  @ApiOkResponse({
    description: 'Success',
    type: TokenResponse,
  })
  @Post('register')
  public async singUp(@Body() dto: UserCreateDto) {
    return this.service.register(dto);
  }

  @ApiOperation({
    description: 'Refresh user access_token',
    summary: 'Refresh user access_token via refresh token.',
  })
  @ApiOkResponse({
    description: 'Success',
    type: TokenResponse,
  })
  @ApiHeader({
    name: 'token',
    example: 'some.refresh_token.here',
    description:
      'Set an refresh_token to this header, to successfully update user tokens. Remember, refresh_token lifetime is only an 24h',
  })
  @Refresh
  @Get('refresh')
  public async refresh(@UserId() id: number) {
    return this.service.refreshTokens(id);
  }
}
