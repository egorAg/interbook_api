import { InterviewResultRepository } from '../../entities/repositories/interview.result.repository';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { QuestionResultCreateDto } from '../../dto/question.result.create.dto';
import { InterviewResult } from '../../domain/types/interview.result';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InterviewRepository } from '../../entities/repositories/interview.repository';

@Injectable()
export class UpdateQuestionUsecase
  implements
    IUsecase<
      { dto: QuestionResultCreateDto; requestUserId: number },
      Promise<InterviewResult>
    >
{
  constructor(
    private readonly репозиторий: InterviewResultRepository,
    private readonly interviewRepo: InterviewRepository,
  ) {}

  async execute({
    dto,
    requestUserId,
  }: {
    dto: QuestionResultCreateDto;
    requestUserId: number;
  }): Promise<InterviewResult> {
    const interview = await this.interviewRepo.getInterviewData(
      dto.interviewId,
      true,
    );
    if (interview.user.id !== requestUserId) {
      throw new ForbiddenException('No access');
    }
    return this.репозиторий.create(dto);
  }
}
