import { Injectable, NotFoundException } from '@nestjs/common';
import { CandidateRepository } from '../../entities/repositories/candidate.repository';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { Candidate } from '../../domain/types/candidate';

@Injectable()
export class GetByIdUsecase implements IUsecase<number, Promise<Candidate>> {
  constructor(private readonly repo: CandidateRepository) {}

  async execute(input: number): Promise<Candidate> {
    const candidate = await this.repo.getById(input);
    if (!candidate) {
      throw new NotFoundException(`Candidate with id: ${input} not registered`);
    }
    return candidate;
  }
}
