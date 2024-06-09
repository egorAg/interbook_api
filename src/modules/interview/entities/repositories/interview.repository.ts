import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateModel } from '../../../candidates/entities/models/candidate.model';
import { TemplateEntity } from '../../../templates/entities/models/template.entity';
import { UserModel } from '../../../user/entities/models/user.model';
import { InterviewMapper } from '../../domain/mappers/interview.mapper';
import { InterviewStatusEnum } from '../../types/interview-status.enum';
import { InterviewModel } from '../models/interview.model';

@Injectable()
export class InterviewRepository {
  constructor(
    @InjectRepository(InterviewModel)
    private readonly repo: Repository<InterviewModel>,
  ) {}

  public async create(
    templateId: string,
    userId: number,
    candidateId: number,
    date: Date,
  ) {
    const record = new InterviewModel();
    record.date = date;
    record.result = [];
    record.isResultPublished = false;
    record.template = {
      id: templateId,
    } as TemplateEntity;
    record.candidate = {
      id: candidateId,
    } as CandidateModel;
    record.user = {
      id: userId,
    } as UserModel;

    await this.repo.save(record);

    return InterviewMapper.toDomain(record);
  }

  public async getInterviewData(id: string, withUser = false) {
    const interview = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        candidate: true,
        result: {
          question: true,
        },
        template: {
          questions: {
            question: true,
          },
        },
        user: withUser,
      },
      order: {
        date: 'DESC',
      },
    });
    console.log(interview);
    return interview;
  }

  public async getHistorical(userId: number) {
    const records = await this.repo.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        date: 'DESC',
      },
      relations: {
        candidate: true,
        template: true,
      },
    });

    return records.map((val) => InterviewMapper.toDomain(val));
  }

  public async getByCandidateIdHistorical(candidateId: number, userId: number) {
    const records = await this.repo.find({
      where: {
        candidate: {
          id: candidateId,
        },
        user: {
          id: userId,
        },
      },
      order: {
        date: 'desc',
      },
    });

    return records.map((val) => InterviewMapper.toDomain(val));
  }

  public async changeVisibility(id: string, visibility: boolean) {
    const record = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    console.log(record);
    console.log(visibility);

    if (!record) {
      return;
    }
    await this.repo.save({ ...record, isResultPublished: visibility });
  }

  public async updateStatus(id: string, status: InterviewStatusEnum) {
    const interview = await this.repo.findOne({ where: { id: id } });
    interview.status = status;
    await this.repo.save(interview);
  }

  public async getInterviewByQuestionId(questionId: string) {
    const result = await this.repo.findOne({
      where: {
        result: {
          id: questionId,
        },
      },
      select: {
        user: {
          id: true,
        },
      },
      relations: {
        user: true,
      },
    });
    if (result) {
      return InterviewMapper.toDomain(result);
    }
  }

  public async updateFeedback(feedback: string, id: string) {
    const interview = await this.repo.findOne({ where: { id: id } });
    interview.finalFeedback = feedback;
    await this.repo.save(interview);
    return InterviewMapper.toDomain(interview);
  }
}
