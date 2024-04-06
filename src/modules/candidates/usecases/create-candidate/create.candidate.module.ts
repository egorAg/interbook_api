import { Module } from '@nestjs/common';
import { CandidateCreateUsecase } from './candidate.create.usecase';
import { CandidateCreateController } from './create.candidate.controller';
import { CandidateRelationalPersistenceModule } from '../../entities/candidate.relational.persistence.module';

@Module({
  imports: [CandidateRelationalPersistenceModule],
  providers: [CandidateCreateUsecase],
  controllers: [CandidateCreateController],
})
export class CreateCandidateModule {}
