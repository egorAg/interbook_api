import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiUnauthorized } from '@/schemas/decorators/unauthorized.decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CandidateService } from '@/modules/candidate/candidate.service';
import { CandidateCreateDto } from '@/modules/candidate/dto/candidate.create.dto';
import { Auth } from '@/decorators/auth.decorator';
import { CandidateSchema } from '@/schemas/candidate.schema';
import { ApiBadRequestResponse } from '@/schemas/decorators/badRequest.decorator';

@ApiTags('Candidates')
@ApiBearerAuth()
@ApiUnauthorized
@Auth()
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @ApiOperation({
    description: 'Create new candidate',
  })
  @ApiResponse({
    status: 200,
    description: `Create new candidate and return all candidates for current workspace`,
    schema: CandidateSchema,
  })
  @ApiBadRequestResponse(
    'Candidate with id: "N" already exists in this workspace',
  )
  @Post('create')
  public async create(@Body() data: CandidateCreateDto) {
    return this.candidateService.createCandidate(data);
  }

  @ApiOperation({
    description: 'Get candidate by id',
  })
  @ApiParam({
    name: 'id',
    description: 'candidate id',
    required: true,
    example: 1,
    type: 'path',
  })
  @ApiResponse({
    status: 200,
    schema: CandidateSchema,
    description: 'Candidate found',
  })
  @ApiBadRequestResponse(
    'Candidate with id: "N" already exists in this workspace',
  )
  @Get(':id')
  public async getById(@Param('id') id: number) {
    return this.candidateService.get(id);
  }

  @ApiOperation({
    description: 'Get all candidates for current workspace',
  })
  @ApiParam({
    name: 'id',
    description: 'workspaceId',
    required: true,
    example: 1,
    type: 'path',
  })
  @ApiResponse({
    status: 200,
    schema: CandidateSchema,
    isArray: true,
  })
  @Get('space/:id')
  public async getAllForSpace(@Param('id') id: number) {
    return this.candidateService.getAll(id);
  }
}
