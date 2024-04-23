import { InterviewResultRepository } from '../../entities/repositories/interview.result.repository';
import { IUsecase } from '../../../../lib/interfaces/usecase.interface';
import { QuestionResultCreateDto } from '../../dto/question.result.create.dto';
import { InterviewResult } from '../../domain/types/interview.result';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InterviewRepository } from '../../entities/repositories/interview.repository';
import { InterviewStatusEnum } from '../../types/interview-status.enum';

@Injectable()
export class UpdateQuestionUsecase
  implements
    IUsecase<
      { dto: QuestionResultCreateDto; requestUserId: number },
      Promise<InterviewResult>
    >
{
  constructor(
    private readonly interviewResultRepository: InterviewResultRepository,
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
    if (interview.status !== InterviewStatusEnum.IN_PROGRESS) {
      throw new HttpException(
        'Добавление ответа на вопрос доступно только когда статус интервью - "В процессе"',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (interview.user.id !== requestUserId) {
      throw new ForbiddenException('No access');
    }
    return this.interviewResultRepository.create(dto);
  }
}
