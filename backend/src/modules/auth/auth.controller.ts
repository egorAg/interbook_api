import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from "@/modules/auth/auth.service";
import { UserCreateDto } from "@/modules/auth/dto/user.create.dto";
import { UserAuthDto } from "@/modules/auth/dto/user.auth.dto";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserId } from "@/decorators/userId.decorator";
import { Auth } from "@/decorators/auth.decorator";
import { Refresh } from "@/decorators/refresh.decorator";
import { UserSchema } from "@/schemas/user.schema";
import { TokenSchema } from "@/schemas/token.schema";
import { ApiUnauthorized } from "@/schemas/decorators/unauthorized.decorator";
import { ApiBadRequestResponse } from "@/schemas/decorators/badRequest.decorator";
import { ApiUserNotFoundResponse } from "@/schemas/decorators/userNotFound.decorator";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({description: 'Create new user'})
  @Post('signup')
  public async signup(@Body() data: UserCreateDto) {
    return this.authService.register(data);
  }

  @ApiOperation({description: 'Authorize already existed user'})
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: TokenSchema
  })
  @ApiUserNotFoundResponse
  @ApiUnauthorized
  @Post('signin')
  public async signin(@Body() data: UserAuthDto) {
    return this.authService.login(data);
  }

  @ApiOperation({description: 'Get user info'})
  @ApiResponse({
    status: 200,
    schema: UserSchema
  })
  @ApiUnauthorized
  @ApiBearerAuth('Auth')
  @Auth()
  @Get('me')
  public async me(
      @UserId() userId: number
  ) {
    const data = await this.authService.me(userId);

    delete data.refreshToken

    return data
  }

  @ApiOperation({
    description: 'Refresh access token'
  })
  @ApiParam({
    name: 'refresh_token',
    description: 'Refresh token received on authorization',
    type: 'header'
  })
  @ApiOkResponse({
    description: 'Success refresh',
    status: 200,
    schema: TokenSchema
  })
  @ApiResponse({
    description: 'Invalid response',
    status: 204,
  })
  @ApiBadRequestResponse('Invalid refresh token')
  @Get('refresh')
  public async refresh(
      @Refresh() data: {
        id: number,
        ref: string,
      }
  ) {
    return this.authService.refresh(data)
  }
}
