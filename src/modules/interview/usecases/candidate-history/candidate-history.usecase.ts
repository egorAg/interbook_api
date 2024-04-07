import { InterviewRepository } from '../../entities/repositories/interview.repository';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { Interview } from '../../domain/types/interview';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CandidateHistoryUsecase
  implements
    IUsecase<
      { candidateId: number; requestUserId: number },
      Promise<Interview[]>
    >
{
  constructor(private readonly repository: InterviewRepository) {}

  async execute({
    candidateId,
    requestUserId,
  }: {
    candidateId: number;
    requestUserId: number;
  }): Promise<Interview[]> {
    return this.repository.getByCandidateIdHistorical(
      candidateId,
      requestUserId,
    );
  }
}
