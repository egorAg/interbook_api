import { Module } from '@nestjs/common';
import {
  CandidateHistoryModule,
  ChangeVisibilityModule,
  CreateModule,
  GetDataByIdModule,
  HistoryModule,
  UpdateQuestionModule,
} from './usecases';

@Module({
  imports: [
    CandidateHistoryModule,
    ChangeVisibilityModule,
    CreateModule,
    GetDataByIdModule,
    HistoryModule,
    UpdateQuestionModule,
  ],
})
export class InterviewModule {}
