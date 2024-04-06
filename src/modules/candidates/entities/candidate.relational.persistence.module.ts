import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateModel } from './models/candidate.model';
import { CandidateRepository } from './repositories/candidate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateModel])],
  providers: [CandidateRepository],
  exports: [CandidateRepository],
})
export class CandidateRelationalPersistenceModule {}
