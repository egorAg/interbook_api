import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagModel } from 'src/modules/tags/entities/models/tag.entity';
import { UserModel } from 'src/modules/user/entities/models/user.model';
import { Repository } from 'typeorm';
import { QuestionFilterDto } from '../../dto/question.filter.dto';
import { Question } from '../../types/question.type';
import { QuestionModel } from '../models/question.model';

@Injectable()
export class QuestionRepository {
  private logger: Logger = new Logger(QuestionRepository.name);

  constructor(
    @InjectRepository(QuestionModel)
    private readonly dataSource: Repository<QuestionModel>,
  ) {}

  public async findQuestions(
    searchDto: QuestionFilterDto,
  ): Promise<Question[]> {
    let { page, pageSize } = searchDto;
    const qb = this.dataSource.createQueryBuilder('question');

    if (!page) {
      page = 1;
    }
    if (!pageSize) {
      pageSize = 20;
    }

    if (searchDto.name) {
      qb.where('question.name ILIKE :name', { name: `%${searchDto.name}%` });
    }

    if (searchDto.tagIds && searchDto.tagIds.length > 0) {
      qb.innerJoinAndSelect('question.tags', 'tag', 'tag.id IN (:...tagIds)', {
        tagIds: searchDto.tagIds,
      });
    } else {
      qb.innerJoinAndSelect('question.tags', 'tag');
    }

    if (searchDto.userId) {
      qb.andWhere('(question.creator.id = :userId)', {
        userId: searchDto.userId,
      });
    }

    qb.innerJoinAndSelect('question.creator', 'creator');

    qb.skip((page - 1) * pageSize).take(pageSize);

    return await qb.getMany();
  }

  public async createQuestion(
    question: Pick<Question, 'name' | 'hint'>,
    user: UserModel,
    tags?: TagModel[],
  ) {
    const newQuestion = new QuestionModel();
    newQuestion.name = question.name;
    newQuestion.creator = user;
    newQuestion.hint = question.hint;

    if (Array.isArray(tags) && tags.length > 0) {
      newQuestion.tags = tags;
    } else {
      newQuestion.tags = [];
    }

    await this.dataSource.save(newQuestion);
  }

  public async updateQuestion(
    questionId: number,
    newName?: string,
    newHint?: string,
    tags?: TagModel[],
  ) {
    const questionToUpdate = await this.dataSource.findOne({
      where: {
        id: questionId,
      },
      relations: {
        tags: true,
      },
    });

    if (!questionToUpdate) {
      throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
    }

    if (newName) {
      questionToUpdate.name = newName;
    }

    if (tags && tags.length > 0) {
      questionToUpdate.tags = tags;
    }

    if (newHint) {
      questionToUpdate.hint = newHint;
    }

    try {
      await this.dataSource.save(questionToUpdate);
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        'Question update failed',
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }

  public async softDelete(id: number) {
    await this.dataSource.delete({ id: id });
  }

  public async getById(id: number, withUser = false) {
    return this.dataSource.findOne({
      where: { id },
      relations: {
        creator: withUser,
      },
    });
  }

  public async updateQuestionIsPublic(id: number, isPublic: boolean) {
    await this.dataSource.update({ id: id }, { isPublic: isPublic });
  }
}
