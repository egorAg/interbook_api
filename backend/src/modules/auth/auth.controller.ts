import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from "@/modules/auth/auth.service";
import { UserCreateDto } from "@/modules/auth/dto/user.create.dto";
import { UserAuthDto } from "@/modules/auth/dto/user.auth.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserId } from "@/decorators/userId.decorator";
import { Auth } from "@/decorators/auth.decorator";

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
  @Post('signin')
  public async signin(@Body() data: UserAuthDto) {
    return this.authService.login(data);
  }

  @ApiOperation({description: 'Get user info'})
  @Auth()
  @Get('me')
  public async me(
      @UserId() userId: number
  ) {
    return this.authService.me(userId);
  }
}
