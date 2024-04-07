import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { CandidateHistoryUsecase } from './candidate-history.usecase';
import { CandidateHistoryController } from './candidate-history.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [CandidateHistoryUsecase],
  controllers: [CandidateHistoryController],
})
export class CandidateHistoryModule {}
