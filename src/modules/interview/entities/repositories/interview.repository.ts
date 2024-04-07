import { InjectRepository } from '@nestjs/typeorm';
import { InterviewModel } from '../models/interview.model';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TemplateEntity } from '../../../templates/entities/models/template.entity';
import { CandidateModel } from '../../../candidates/entities/models/candidate.model';
import { UserModel } from '../../../user/entities/models/user.model';
import { InterviewMapper } from '../../domain/mappers/interview.mapper';

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
    return InterviewMapper.toDomain(
      await this.repo.findOne({
        where: {
          id: id,
        },
        relations: {
          candidate: true,
          template: {
            questions: {
              question: true,
            },
          },
          result: true,
          user: withUser,
        },
        order: {
          date: 'DESC',
        },
      }),
    );
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
    });

    return records.map((val) => InterviewMapper.toDomain(val));
  }

  public async getByCandidateIdHistorical(candidateId: number, userId: number) {
    console.log('here');
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
    await this.repo.update(
      {
        id: id,
      },
      { isResultPublished: visibility },
    );
  }
}
