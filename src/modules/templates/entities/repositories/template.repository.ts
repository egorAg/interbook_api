import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { QuestionModel } from '../../../questions/entities/models/question.model';
import { UserModel } from '../../../user/entities/models/user.model';
import { TemplateQuestionModel } from '../models/template-question.entity';
import { TemplateEntity } from '../models/template.entity';

@Injectable()
export class TemplateRepository {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepo: Repository<TemplateEntity>,
    @InjectRepository(TemplateQuestionModel)
    private readonly templateQuestionRepo: Repository<TemplateQuestionModel>,
  ) {}

  public async createTemplate(name: string, isPublic: boolean, userId: number) {
    const templateRecord = new TemplateEntity();
    templateRecord.isPublic = isPublic;
    templateRecord.name = name;
    templateRecord.user = {
      id: userId,
    } as UserModel;

    await this.templateRepo.save(templateRecord);

    return templateRecord.id;
  }

  public async findSimilar(name: string) {
    return this.templateRepo.find({
      where: {
        name: ILike(`%${name}%`),
        isPublic: true,
      },
      take: 5,
    });
  }

  public async getById(id: string, withUser: boolean) {
    return this.templateRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: withUser,
      },
    });
  }

  public async getFullById(id: string) {
    return this.templateRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        questions: {
          question: true,
        },
        user: true,
      },
    });
  }

  public async createQuestion(
    questionId: number,
    templateId: string,
    note: string,
  ) {
    const question = this.templateQuestionRepo.create();
    question.question = {
      id: questionId,
    } as QuestionModel;
    question.template = {
      id: templateId,
    } as TemplateEntity;
    if (note) question.note = note;

    await this.templateQuestionRepo.save(question);

    return question.id;
  }

  public async getQuestionById(id: string) {
    return this.templateQuestionRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  public async removeQuestion(id: string) {
    const template = await this.templateRepo.findOne({
      where: {
        questions: {
          id: id,
        },
      },
    });
    const newOrder = template.order.filter((item) => item !== id);
    await this.updateOrder(template.id, newOrder);
    await this.templateQuestionRepo.delete({ id: id });
  }

  public async removeTemplate(id: string) {
    await this.templateRepo.delete({ id: id });
  }

  public async getAll(
    isPublic?: boolean,
    name?: string,
    page?: number,
    pageSize?: number,
    userId?: number,
  ) {
    const condition: FindOptionsWhere<TemplateEntity> = {};
    if (isPublic) {
      condition.isPublic = isPublic;
    }
    if (name) {
      condition.name = ILike(`%${name}%`);
    }
    if (userId) {
      condition.user = {
        id: +userId,
      };
    }
    if (!page) {
      page = 1;
    }
    if (!pageSize) {
      pageSize = 20;
    }

    const data = await this.templateRepo.find({
      where: condition,
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: {
        user: true,
      },
    });

    data.forEach((record) => {
      delete record.user.password;
      delete record.user.refreshToken;
    });

    return data;
  }

  public async updateOrder(id: string, order: string[]) {
    const currentTemplate = await this.templateRepo.findOne({
      where: { id: id },
    });
    currentTemplate.order = order;
    await this.templateRepo.save(currentTemplate);
  }

  public async updateName(id: string, name: string) {
    const currentTemplate = await this.templateRepo.findOne({
      where: { id: id },
    });
    currentTemplate.name = name;
    await this.templateRepo.save(currentTemplate);
  }

  public async updateIsPublic(id: string, isPublic: boolean) {
    const currentTemplate = await this.templateRepo.findOne({
      where: { id: id },
    });
    currentTemplate.isPublic = isPublic;
    await this.templateRepo.save(currentTemplate);
  }
}
