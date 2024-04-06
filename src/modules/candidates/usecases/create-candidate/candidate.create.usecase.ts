import { Injectable } from '@nestjs/common';
import { CandidateRepository } from '../../entities/repositories/candidate.repository';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { CandidateModel } from '../../entities/models/candidate.model';
import { CreateCandidateDto } from '../../dto/create.candidate.dto';
import { Candidate } from '../../domain/types/candidate';
import { CandidateMapper } from '../../domain/mappers/candidate.mapper';

@Injectable()
export class CandidateCreateUsecase
  implements
    IUsecase<{ dto: CreateCandidateDto; userId: number }, Promise<Candidate>>
{
  constructor(private readonly candidateRepo: CandidateRepository) {}

  async execute(input: {
    dto: CreateCandidateDto;
    userId: number;
  }): Promise<CandidateModel> {
    return CandidateMapper.toDomain(
      await this.candidateRepo.create(input.dto, input.userId),
    );
  }
}
