import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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

  public async getAll(
    name: string,
    tags: number[],
    userId: number,
    page: number,
    pageSize: number,
  ) {
    const questions = await this.questionRepo.findQuestions({
      name: name,
      tagIds: tags?.length ? tags : null,
      userId,
      page: page,
      pageSize: pageSize,
    });

    for (const question of questions) {
      delete question.creator.refreshToken;
      delete question.creator.password;
    }

    return questions;
  }

  public async createNew(
    { name, hint, tagIds }: CreateQuestionDto,
    userId: number,
  ) {
    const user = await this.userService.findUser({ id: userId });
    if (Array.isArray(tagIds) && tagIds.length > 0) {
      const tags = await this.tagService.getById(tagIds);
      return this.questionRepo.createQuestion({ name: name, hint }, user, tags);
    } else {
      return this.questionRepo.createQuestion(
        {
          name,
          hint,
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
      payload.hint,
      tags.length > 0 ? tags : undefined,
    );
  }

  public async softDelete(id: number) {
    await this.questionRepo.softDelete(id);
  }

  public async setIsPublic(id: number, isPublic: boolean, userId: number) {
    const currentQuestion = await this.questionRepo.getById(id, true);
    if (currentQuestion.creator.id !== userId) {
      throw new BadRequestException(
        'Вы не являетесь создателем данного вопроса',
      );
    }
    await this.questionRepo.updateQuestionIsPublic(id, isPublic);
  }
}
