import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { UpdateInterviewStatusUsecase } from './update-interview-status.usecase';
import { UpdateInterviewStatusController } from './update-interview-status.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [UpdateInterviewStatusUsecase],
  controllers: [UpdateInterviewStatusController],
})
export class UpdateInterviewStatusModule {}
