import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { IUsecase } from '../../../../lib/interfaces/usecase.interface'
import { Interview } from '../../domain/types/interview'
import { UpdateFinalFeedbackDto } from '../../dto/update-final-feedback.dto'
import { InterviewRepository } from '../../entities/repositories/interview.repository'
import { InterviewStatusEnum } from '../../types/interview-status.enum'

@Injectable()
export class UpdateFinalFeedbackUsecase
  implements
    IUsecase<
      { dto: UpdateFinalFeedbackDto; requestUserId: number },
      Promise<Interview>
    >
{
  constructor(private readonly interviewRepo: InterviewRepository) {}

  async execute({
    dto,
    requestUserId,
  }: {
    dto: UpdateFinalFeedbackDto;
    requestUserId: number;
  }): Promise<Interview> {
    const interview = await this.interviewRepo.getInterviewData(
      dto.interviewId,
      true,
    );
    if (interview.status !== InterviewStatusEnum.IN_PROGRESS) {
      throw new HttpException(
        'Добавление ответа на вопрос доступно только когда статус интервью - "В процессе"',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (interview.user.id !== requestUserId) {
      throw new ForbiddenException('No access');
    }

    return this.interviewRepo.updateFeedback(
      dto.finalFeedback,
      dto.interviewId,
    );
  }
}
