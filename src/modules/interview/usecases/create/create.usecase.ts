import { InterviewRepository } from '../../entities/repositories/interview.repository';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { InterviewCreateDto } from '../../dto/interview.create.dto';
import { Interview } from '../../domain/types/interview';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUsecase
  implements
    IUsecase<{ dto: InterviewCreateDto; userId: number }, Promise<Interview>>
{
  constructor(private readonly interviewRepo: InterviewRepository) {}

  async execute({
    dto,
    userId,
  }: {
    dto: InterviewCreateDto;
    userId: number;
  }): Promise<Interview> {
    return this.interviewRepo.create(
      dto.templateId,
      userId,
      dto.candidateId,
      dto.date ?? new Date(),
    );
  }
}
