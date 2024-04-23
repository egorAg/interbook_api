import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { QuestionResultUpdateDto } from '../../dto/question-result.update.dto';
import { InterviewResult } from '../../domain/types/interview.result';
import { InterviewRepository } from '../../entities/repositories/interview.repository';
import { InterviewResultRepository } from '../../entities/repositories/interview.result.repository';
import { InterviewStatusEnum } from '../../types/interview-status.enum';

@Injectable()
export class UpdateQuestionResultUsecase
  implements
    IUsecase<
      { requestUserId: number; payload: QuestionResultUpdateDto },
      Promise<InterviewResult>
    >
{
  constructor(
    private readonly interviewRepo: InterviewRepository,
    private readonly interviewResultRepository: InterviewResultRepository,
  ) {}

  public async execute({
    requestUserId,
    payload,
  }: {
    requestUserId: number;
    payload: QuestionResultUpdateDto;
  }): Promise<InterviewResult> {
    const interview = await this.interviewRepo.getInterviewByQuestionId(
      payload.id,
    );

    if (!interview) {
      throw new NotFoundException();
    }

    if (interview.user.id !== requestUserId) {
      throw new HttpException(
        'Вы не проводите данное интервью',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (interview.status !== InterviewStatusEnum.IN_PROGRESS) {
      throw new HttpException(
        'Редактировать результаты можно только если интервью в процессе',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentResult = await this.interviewResultRepository.getById(
      payload.id,
    );

    if (!currentResult) {
      throw new NotFoundException('Такой результат не найден');
    }

    await this.interviewResultRepository.update(
      payload.id,
      payload.rate ?? currentResult.rate,
      payload.interviewNote ?? currentResult.interviewNote,
    );

    return await this.interviewResultRepository.getById(payload.id);
  }
}
