import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagModel } from 'src/modules/tags/entities/models/tag.entity';
import { UserModel } from 'src/modules/user/entities/models/user.model';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
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
    const whereCondition: FindOptionsWhere<QuestionModel> = {};

    if (!page) {
      page = 1;
    }
    if (!pageSize) {
      pageSize = 20;
    }

    if (searchDto.name) {
      whereCondition.name = ILike(`%${searchDto.name}%`);
    }

    if (searchDto.tagIds && searchDto.tagIds.length > 0) {
      whereCondition.tags = searchDto.tagIds.map((tagId) => ({ id: tagId }));
    }

    if (!searchDto.isPublic) {
      whereCondition.isPublic = false;
      whereCondition.creator = {
        id: searchDto.userId,
      };
    }

    return await this.dataSource.find({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: {
        tags: true,
      },
    });
  }

  public async createQuestion(
    question: Pick<Question, 'name'>,
    user: UserModel,
    tags?: TagModel[],
  ) {
    const newQuestion = new QuestionModel();
    newQuestion.name = question.name;
    newQuestion.creator = user;

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

  public async getAllByUser(user: UserModel) {
    return this.dataSource.find({
      where: {
        creator: user,
      },
    });
  }

  public async softDelete(id: number) {
    await this.dataSource.delete({ id: id });
  }

  public async getById(id: number) {
    return this.dataSource.findOne({ where: { id } });
  }
}
