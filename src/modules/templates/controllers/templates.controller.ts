import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../../decorators/auth.decorator';
import { TemplatesService } from '../services/templates.service';
import { UserId } from '../../../decorators/userid.decorator';
import { TemplateCreateDto } from '../dto/template.create.dto';
import { QuestionCreateDto } from '../dto/question.create.dto';
import { TemplateCreateResponse } from '../../../responses/templates/template.create.response';

@Auth
@ApiTags('Templates')
@Controller('template')
export class TemplatesController {
  constructor(private readonly service: TemplatesService) {}

  @ApiOperation({ summary: 'Create template' })
  @ApiResponse({
    status: 200,
    description: 'Return the created templateId',
    type: TemplateCreateResponse,
  })
  @Post()
  public createTemplate(@Body() dto: TemplateCreateDto, @UserId() id: number) {
    return this.service.createTemplate(dto, id);
  }

  @ApiOperation({ summary: 'Add question to template' })
  @ApiResponse({
    status: 200,
    description: 'Return the created questionId',
    type: TemplateCreateResponse,
  })
  @Post('question')
  public createQuestion(@Body() dto: QuestionCreateDto, @UserId() id: number) {
    return this.service.createQuestion(dto, id);
  }

  @ApiOperation({ summary: 'Get all user templates' })
  @ApiResponse({
    status: 200,
    description: 'Return the templates where user is owner',
    type: TemplateCreateResponse,
  })
  @Get('user')
  public getAllTemplates(
    @UserId() id: number,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.service.getAllTemplatesByUser(id, page, pageSize);
  }

  @ApiOperation({ summary: 'Get all template data by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the template by id with data',
    type: TemplateCreateResponse,
  })
  @Get(':id')
  public getById(@Param('id') id: string) {
    return this.service.getTemplateWithQuestions(id);
  }

  @ApiOperation({ summary: 'Get all public templates' })
  @ApiResponse({
    status: 200,
    description: 'Return all templates',
    type: TemplateCreateResponse,
  })
  @ApiQuery({
    name: 'name',
    type: 'string',
    required: false,
    example: 'Junior',
  })
  @ApiQuery({ name: 'page', type: 'number', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: false, example: 20 })
  @Get()
  public getPublicByName(
    @Query('name') name?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.service.getAllTemplates(name, page, pageSize);
  }

  @ApiOperation({
    summary: 'Get latest 5 public templates where name is similar with related',
  })
  @ApiResponse({
    status: 200,
    description: 'Return similar template',
    type: TemplateCreateResponse,
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    required: false,
    example: 'Junior',
  })
  @Get('similar/:name')
  public getSimilar(@Param('name') name: string) {
    return this.service.getSimilarByName(name);
  }

  @ApiOperation({ summary: 'Remove template' })
  @ApiResponse({
    status: 200,
    description: 'Remove template',
    type: TemplateCreateResponse,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: false,
    example: 'some-uuid-v4-here',
  })
  @Delete(':id')
  public deleteTemplate(@Param('id') id: string) {
    return this.service.removeTemplate(id);
  }

  @ApiOperation({ summary: 'Remove question' })
  @ApiResponse({
    status: 200,
    description: 'Remove question',
    type: TemplateCreateResponse,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: false,
    example: 'some-uuid-v4-here',
  })
  @Delete('question/:id')
  public deleteQuestion(@Param('id') id: string) {
    return this.service.removeQuestion(id);
  }
}
