import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TagsService } from 'src/modules/tags/services/tags.service';
import { UserService } from 'src/modules/user/services/user.service';
import { CreateQuestionDto } from '../dto/question.create.dto';
import { QuestionFilterDto } from '../dto/question.filter.dto';
import { UpdateQuestionDto } from '../dto/question.update.dto';
import { QuestionRepository } from '../entities/repositories/question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly userService: UserService,
    private readonly tagService: TagsService,
  ) {}

  public async getAllByFilter(payload: QuestionFilterDto) {
    return this.questionRepo.findQuestions(payload);
  }

  public async getAllByUserId(userId: number) {
    const user = await this.userService.findUser({ id: userId });
    return this.questionRepo.getAllByUser(user);
  }

  public async getAll(
    name: string,
    tags: number[],
    isPublic: boolean,
    userId: number,
    page: number,
    pageSize: number,
  ) {
    return this.questionRepo.findQuestions({
      name: name,
      tagIds: tags?.length ? tags : null,
      isPublic,
      userId,
      page: page,
      pageSize: pageSize,
    });
  }

  public async createNew(payload: CreateQuestionDto, userId: number) {
    const user = await this.userService.findUser({ id: userId });
    if (Array.isArray(payload.tagIds) && payload.tagIds.length > 0) {
      const tags = await this.tagService.getById(payload.tagIds);
      return this.questionRepo.createQuestion(
        { name: payload.name },
        user,
        tags,
      );
    } else {
      return this.questionRepo.createQuestion(
        {
          name: payload.name,
        },
        user,
      );
    }
  }

  public async updateQuestion(payload: UpdateQuestionDto, userId: number) {
    const currentQuestion = await this.questionRepo.getById(payload.id);
    if (currentQuestion.creator.id !== userId) {
      throw new HttpException(
        'Вопрос может редактировать только создатель',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    const tags = await this.tagService.getById(payload.tagIds);
    await this.questionRepo.updateQuestion(
      payload.id,
      payload.name,
      tags.length > 0 ? tags : undefined,
    );
  }

  public async softDelete(id: number) {
    await this.questionRepo.softDelete(id);
  }
}
