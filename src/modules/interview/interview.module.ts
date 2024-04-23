import { Module } from '@nestjs/common';
import {
  CandidateHistoryModule,
  ChangeVisibilityModule,
  CreateModule,
  GetDataByIdModule,
  HistoryModule,
  UpdateInterviewStatusModule,
  UpdateQuestionModule,
  UpdateQuestionResultModule,
} from './usecases';

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
  ],
})
export class InterviewModule {}
