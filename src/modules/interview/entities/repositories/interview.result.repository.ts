import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionModel } from '../../../questions/entities/models/question.model';
import { InterviewResultMapper } from '../../domain/mappers/interview.result.mapper';
import { InterviewResult } from '../../domain/types/interview.result';
import { QuestionResultCreateDto } from '../../dto/question.result.create.dto';
import { InterviewModel } from '../models/interview.model';
import { InterviewResultModel } from '../models/interview.result.model';

@Injectable()
export class InterviewResultRepository {
  constructor(
    @InjectRepository(InterviewResultModel)
    private readonly repo: Repository<InterviewResultModel>,
  ) {}

  public async create(payload: QuestionResultCreateDto) {
    const record = new InterviewResultModel();
    record.interview = { id: payload.interviewId } as InterviewModel;
    record.question = { id: payload.questionId } as QuestionModel;
    record.rate = payload.rate;
    if (payload.interviewNote) record.interviewNote = payload.interviewNote;
    await this.repo.save(record);
    return InterviewResultMapper.toDomain(record);
  }

  public async update(id: string, rate: number, note: string) {
    const record = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    record.rate = rate;
    record.interviewNote = note;

    await this.repo.save(record);
  }

  public async getById(id: string): Promise<InterviewResult> {
    const result = await this.repo.findOne({ where: { id: id } });
    if (result) {
      return InterviewResultMapper.toDomain(result);
    }
  }
}
