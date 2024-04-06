import { Injectable } from '@nestjs/common';
import { CandidateRepository } from '../../entities/repositories/candidate.repository';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { Candidate } from '../../domain/types/candidate';
import { CandidateMapper } from '../../domain/mappers/candidate.mapper';

@Injectable()
export class GetForActiveUserUsecase
  implements IUsecase<{ userId: number }, Promise<Candidate[]>>
{
  constructor(private readonly repository: CandidateRepository) {}

  async execute(input: { userId: number }): Promise<Candidate[]> {
    const candidates = await this.repository.getAllForCreator(input.userId);

    return candidates.map((candidate) => CandidateMapper.toDomain(candidate));
  }
}
