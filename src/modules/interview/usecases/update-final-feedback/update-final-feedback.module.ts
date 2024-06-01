import { Module } from '@nestjs/common'
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module'
import { UpdateFinalFeedbackController } from './update-final-feedback.controller'
import { UpdateFinalFeedbackUsecase } from './update-final-feedback.usecase'

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [UpdateFinalFeedbackUsecase],
  controllers: [UpdateFinalFeedbackController],
})
export class UpdateFinalFeedbackModule {}
