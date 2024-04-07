import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { UpdateCandidateDto } from '../../dto/update.candidate.dto';
import { Candidate } from '../../domain/types/candidate';
import { CandidateRepository } from '../../entities/repositories/candidate.repository';
import { CandidateMapper } from '../../domain/mappers/candidate.mapper';

export class UpdateUsecase
  implements IUsecase<{ dto: UpdateCandidateDto }, Promise<Candidate>>
{
  constructor(private readonly repo: CandidateRepository) {}
  async execute({ dto }: { dto: UpdateCandidateDto }): Promise<Candidate> {
    await this.repo.update(
      CandidateMapper.toPersistence({
        id: dto.id,
        name: dto.name,
        surname: dto.surname,
        specialty: dto.speciality,
        grade: dto.grade,
        salary: dto.salary,
        experience: dto.experience,
        interviews: [],
      }),
    );

    return CandidateMapper.toDomain(await this.repo.getById(dto.id));
  }
}
