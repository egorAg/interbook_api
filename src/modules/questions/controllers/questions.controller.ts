import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { UserId } from 'src/decorators/userid.decorator';
import { QuestionResponse } from 'src/responses/questios/question.response';
import { CreateQuestionDto } from '../dto/question.create.dto';
import { QuestionFilterDto } from '../dto/question.filter.dto';
import { UpdateQuestionDto } from '../dto/question.update.dto';
import { QuestionModel } from '../entities/models/question.model';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../types/question.type';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @Auth
  @Post('find')
  @ApiOperation({ summary: 'Search questions by tags and name' })
  @ApiResponse({
    status: 200,
    description: 'List of questions found successfully.',
    type: [QuestionResponse],
  })
  async searchQuestions(
    @Body() searchDto: QuestionFilterDto,
  ): Promise<Question[]> {
    return this.service.getAllByFilter(searchDto);
  }

  @Auth
  @Get('/my-questions')
  @ApiOperation({ summary: 'Get all current user questions' })
  @ApiResponse({
    status: 200,
    description: 'List of questions found successfully.',
    type: [QuestionResponse],
  })
  async getUserQuestions(@UserId() userId: number): Promise<QuestionModel[]> {
    return this.service.getAllByUserId(userId);
  }

  @Auth
  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'Question created successfully.' })
  @ApiBody({ type: CreateQuestionDto })
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @UserId() id: number,
  ) {
    await this.service.createNew(createQuestionDto, id);
  }

  @Auth
  @Patch()
  @ApiOperation({
    summary: 'Update an existing question',
    description:
      'Update an existing question. Please, send all applied tags in the payload or empty array',
  })
  @ApiResponse({ status: 200, description: 'Question updated successfully.' })
  @ApiBody({ type: UpdateQuestionDto })
  async updateQuestion(
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<any> {
    return this.service.updateQuestion(updateQuestionDto);
  }

  @Auth
  @Get()
  @ApiOperation({
    summary: 'Get all existing questions',
  })
  @ApiQuery({ name: 'name', type: 'string', example: 'React', required: false })
  @ApiQuery({
    name: 'tags',
    type: 'string',
    example: '1,2,3',
    required: false,
  })
  @ApiQuery({ name: 'page', type: 'number', example: 2, required: false })
  @ApiQuery({ name: 'pageSize', type: 'number', example: 20, required: false })
  async getAllQuestions(
    @Query('name') name: string,
    @Query('tags', new ParseArrayPipe({ items: Number, separator: ',' }))
    tags: number[],
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.service.getAll(name, tags, page, pageSize);
  }

  @Auth
  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
  })
  @HttpCode(HttpStatus.OK)
  async softDelete(@Param('id') id: number) {
    await this.service.softDelete(id);
  }
}
