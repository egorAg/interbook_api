import { BadRequestException, Injectable } from '@nestjs/common';
import { TemplateRepository } from '../entities/repositories/template.repository';
import { TemplateCreateDto } from '../dto/template.create.dto';
import { QuestionCreateDto } from '../dto/question.create.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly templateRepo: TemplateRepository) {}

  public async createTemplate(dto: TemplateCreateDto, userId: number) {
    return this.templateRepo.createTemplate(dto.name, dto.isPublic, userId);
  }

  public async createQuestion(dto: QuestionCreateDto, userId: number) {
    const template = await this.templateRepo.getById(dto.templateId, true);

    if (template.user.id !== userId) {
      throw new BadRequestException('This is not your template');
    }

    return this.templateRepo.createQuestion(
      dto.questionId,
      dto.templateId,
      dto.note,
    );
  }

  public async getTemplateWithQuestions(id: string) {
    return this.templateRepo.getFullById(id);
  }

  public async getSimilarByName(name: string) {
    return this.templateRepo.findSimilar(name);
  }

  public async removeQuestion(id: string) {
    await this.templateRepo.removeQuestion(id);
  }

  public async removeTemplate(id: string) {
    await this.templateRepo.removeTemplate(id);
  }

  public async getAllTemplates(
    name?: string,
    page?: number,
    pageSize?: number,
  ) {
    return this.templateRepo.getAll(true, name, page, pageSize);
  }

  public async getAllTemplatesByUser(
    userId: number,
    page?: number,
    pageSize?: number,
  ) {
    return this.templateRepo.getAll(
      undefined,
      undefined,
      +page,
      +pageSize,
      userId,
    );
  }

  public async order(userId: number, templateId: string, order: string[]) {
    const template = await this.templateRepo.getById(templateId, true);
    if (template.user.id !== userId) {
      throw new BadRequestException('Your not an owner');
    }
    return this.templateRepo.updateOrder(templateId, order);
  }
}
