import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { UpdateQuestionUsecase } from './update-question.usecase';
import { UpdateQuestionController } from './update-question.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [UpdateQuestionUsecase],
  controllers: [UpdateQuestionController],
})
export class UpdateQuestionModule {}
