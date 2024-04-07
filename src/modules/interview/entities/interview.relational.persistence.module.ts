import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewModel } from './models/interview.model';
import { InterviewResultModel } from './models/interview.result.model';
import { InterviewRepository } from './repositories/interview.repository';
import { InterviewResultRepository } from './repositories/interview.result.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewModel, InterviewResultModel])],
  providers: [InterviewRepository, InterviewResultRepository],
  exports: [InterviewRepository, InterviewResultRepository],
})
export class InterviewRelationalPersistenceModule {}
