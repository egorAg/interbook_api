import { Module } from '@nestjs/common'
import {
  CandidateHistoryModule,
  ChangeVisibilityModule,
  CreateModule,
  GetDataByIdModule,
  HistoryModule,
  UpdateInterviewStatusModule,
  UpdateQuestionModule,
  UpdateQuestionResultModule,
} from './usecases'
import { UpdateFinalFeedbackModule } from './usecases/update-final-feedback/update-final-feedback.module'

@Module({
  imports: [
    CandidateHistoryModule,
    ChangeVisibilityModule,
    CreateModule,
    GetDataByIdModule,
    HistoryModule,
    UpdateQuestionModule,
    UpdateInterviewStatusModule,
    UpdateQuestionResultModule,
    UpdateFinalFeedbackModule
  ],
})
export class InterviewModule {}
