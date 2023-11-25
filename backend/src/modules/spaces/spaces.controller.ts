import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SpacesService } from '@/modules/spaces/spaces.service';
import { Auth } from '@/decorators/auth.decorator';
import { UserId } from '@/decorators/userId.decorator';
import { ApiUnauthorized } from '@/schemas/decorators/unauthorized.decorator';
import { SpaceCreateDto } from '@/modules/spaces/dto/space.create.dto';
import { ApiUserNotFoundResponse } from '@/schemas/decorators/userNotFound.decorator';
import { ApiBadRequestResponse } from '@/schemas/decorators/badRequest.decorator';
import { ApiMethodNotAllowedResponse } from '@/schemas/decorators/apiMethodNotAllowedResponse';
import { InviteTokenSchema } from '@/schemas/inviteToken.schema';
import { WorkSpaceSchema } from '@/schemas/workSpaceSchema';

@ApiTags('Spaces')
@ApiBearerAuth()
@ApiUnauthorized
@Auth()
@Controller('space')
export class SpacesController {
  constructor(private service: SpacesService) {}

  @ApiOperation({
    description: 'create new workspace',
  })
  @ApiUserNotFoundResponse
  @ApiResponse({
    status: 200,
    schema: WorkSpaceSchema,
  })
  @Post('create')
  public async create(@UserId() userId: number, @Body() data: SpaceCreateDto) {
    return await this.service.createService(userId, data);
  }

  @ApiOperation({
    description: 'Get workspace data',
  })
  @ApiParam({
    name: 'id',
    description: 'WorkspaceId',
    required: true,
    example: 1,
    type: 'path',
  })
  @ApiResponse({
    description: 'Success',
    status: 200,
    schema: WorkSpaceSchema,
  })
  @ApiBadRequestResponse("Can't find space with id: 1")
  @Get(':id')
  public async getSpaceData(@Param('id') id: number) {
    return await this.service.getSpaceById(id);
  }

  @ApiOperation({
    description: 'Create invite token for workspace',
  })
  @ApiResponse({
    status: 200,
    schema: InviteTokenSchema,
  })
  @ApiMethodNotAllowedResponse('You are not an admin')
  @ApiBadRequestResponse("Can't find space with id: 1")
  @ApiUserNotFoundResponse
  @Get('/invite/:spaceId')
  public async createInviteToken(
    @UserId() id: number,
    @Param('spaceId') spaceId: number,
  ) {
    return await this.service.createInviteToken(id, spaceId);
  }

  @ApiOperation({
    description: 'Accept invite in workspace',
  })
  @ApiBadRequestResponse([
    "Can't find provided token",
    "Can't parse spaceId from token",
    "Can't find space with id: 1",
    'You already in this space',
  ])
  @ApiResponse({
    status: 200,
    description: `Success`,
    schema: {
      properties: {
        success: {
          example: true,
        },
      },
    },
  })
  @Get('invite/accept/:token')
  public async acceptInvite(
    @UserId() id: number,
    @Param('token') token: string,
  ) {
    return this.service.acceptInvite(token, id);
  }

  @ApiOperation({
    description: 'Set workspace to user',
  })
  @ApiResponse({
    description: 'Success',
    status: 201,
  })
  @ApiUserNotFoundResponse
  @ApiBadRequestResponse('Can\'t find space with id: "N"')
  @Get('switch/:id')
  public async switchSpace(
    @UserId() userId: number,
    @Param('id') spaceId: number,
  ) {
    await this.service.setWorkspace(userId, spaceId);
  }
}
