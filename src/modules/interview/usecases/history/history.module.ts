import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { HistoryUsecase } from './history.usecase';
import { HistoryController } from './history.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [HistoryUsecase],
  controllers: [HistoryController],
})
export class HistoryModule {}
