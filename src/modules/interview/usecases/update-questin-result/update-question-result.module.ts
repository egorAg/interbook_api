import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { UpdateQuestionResultUsecase } from './update-question-result.usecase';
import { UpdateQuestionResultController } from './update-question-result.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [UpdateQuestionResultUsecase],
  controllers: [UpdateQuestionResultController],
})
export class UpdateQuestionResultModule {}
