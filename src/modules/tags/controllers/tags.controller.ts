import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { TagCreateDto } from '../dto/tag.create.dto';
import { TagsService } from '../services/tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsService) {}

  @ApiOperation({
    summary: 'Create new tag',
    description:
      'This handle used to creation of new tags. If tag already exists - return it permanently without creation of the new one',
  })
  @Auth
  @Post()
  public async create(@Body() payload: TagCreateDto) {
    return this.service.create(payload.name);
  }

  @ApiOperation({
    summary: 'Get all tags by name',
    description:
      'Send the name and server will returns all tags witch one matches the received name',
  })
  @ApiQuery({
    name: 'name',
    type: 'string',
    example: 'React',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    example: 1,
    required: false,
    description: 'Select the page of pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    type: 'number',
    example: 10,
    required: false,
    description: 'Set pagination page size',
  })
  @Auth
  @Get()
  public async getAllByNameMatch(
    @Query('name') name: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.service.getAllByName(name, page, pageSize);
  }

  @ApiOperation({
    summary: 'Get tag by id',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    required: true,
  })
  @Auth
  @Get('/:id')
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
