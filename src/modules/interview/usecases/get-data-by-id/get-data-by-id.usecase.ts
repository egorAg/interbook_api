import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { Interview } from '../../domain/types/interview';
import { InterviewRepository } from '../../entities/repositories/interview.repository';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class GetDataByIdUsecase
  implements
    IUsecase<{ id: string; requestUserId?: number }, Promise<Interview>>
{
  constructor(private readonly interviewRepo: InterviewRepository) {}
  async execute({
    id,
    requestUserId,
  }: {
    id: string;
    requestUserId?: number;
  }): Promise<Interview> {
    const interview = await this.interviewRepo.getInterviewData(id, true);
    delete interview.user.password;
    delete interview.user.refreshToken;
    if (interview.user.id === requestUserId) {
      return interview;
    } else if (interview.isResultPublished) {
      return interview;
    } else if (
      !interview.isResultPublished &&
      requestUserId !== interview.user.id
    ) {
      throw new ForbiddenException('No access');
    }
  }
}
