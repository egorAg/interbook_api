import { Module } from '@nestjs/common';
import { CandidateRelationalPersistenceModule } from '../../entities/candidate.relational.persistence.module';
import { GetByIdUsecase } from './get-by-id.usecase';
import { GetByIdController } from './get-by-id.controller';

@Module({
  imports: [CandidateRelationalPersistenceModule],
  providers: [GetByIdUsecase],
  controllers: [GetByIdController],
})
export class GetByIdModule {}
