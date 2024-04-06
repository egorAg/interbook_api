import { Module } from '@nestjs/common';
import { CandidateRelationalPersistenceModule } from '../../entities/candidate.relational.persistence.module';
import { UpdateUsecase } from './update.usecase';
import { UpdateController } from './update.controller';

@Module({
  imports: [CandidateRelationalPersistenceModule],
  providers: [UpdateUsecase],
  controllers: [UpdateController],
})
export class UpdateModule {}
