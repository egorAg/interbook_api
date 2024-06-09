import { ForbiddenException, Injectable } from '@nestjs/common';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { InterviewRepository } from '../../entities/repositories/interview.repository';

@Injectable()
export class ChangeVisibilityUsecase
  implements
    IUsecase<
      { id: string; visibility: boolean; requestUserId: number },
      Promise<void>
    >
{
  constructor(private readonly repo: InterviewRepository) {}

  async execute({
    id,
    visibility,
    requestUserId,
  }: {
    id: string;
    visibility: boolean;
    requestUserId: number;
  }): Promise<void> {
    const candidate = await this.repo.getInterviewData(id, true);
    if (candidate.user.id !== requestUserId) {
      throw new ForbiddenException('You have no access');
    }
    await this.repo.changeVisibility(id, visibility);
  }
}
