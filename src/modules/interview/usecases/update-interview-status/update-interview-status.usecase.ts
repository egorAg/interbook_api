import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InterviewRepository } from '../../entities/repositories/interview.repository';
import { InterviewStatusEnum } from '../../types/interview-status.enum';

@Injectable()
export class UpdateInterviewStatusUsecase
  implements
    IUsecase<
      {
        id: string;
        requestUserId: number;
        status: InterviewStatusEnum;
      },
      Promise<void>
    >
{
  constructor(private readonly interviewRepo: InterviewRepository) {}

  async execute({
    id,
    requestUserId,
    status,
  }: {
    id: string;
    requestUserId: number;
    status: InterviewStatusEnum;
  }): Promise<void> {
    const interview = await this.interviewRepo.getInterviewData(id, true);
    if (interview.user.id !== requestUserId) {
      throw new ForbiddenException('No access');
    }
    await this.interviewRepo.updateStatus(id, status);
  }
}
