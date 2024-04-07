import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { Interview } from '../../domain/types/interview';
import { InterviewRepository } from '../../entities/repositories/interview.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryUsecase
  implements IUsecase<{ userId: number }, Promise<Interview[]>>
{
  constructor(private readonly repo: InterviewRepository) {}
  async execute({ userId }: { userId: number }): Promise<Interview[]> {
    return this.repo.getHistorical(userId);
  }
}
