import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { CandidateRepository } from '../../entities/repositories/candidate.repository';

export class RemoveUsecase implements IUsecase<{ id: number }, Promise<void>> {
  constructor(private readonly repo: CandidateRepository) {}
  async execute({ id }: { id: number }): Promise<void> {
    const candidate = await this.repo.getById(id);

    if (!candidate) {
      return;
    }

    await this.repo.remove(id);
  }
}
