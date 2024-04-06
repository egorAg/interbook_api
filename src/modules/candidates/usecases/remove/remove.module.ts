import { Module } from '@nestjs/common';
import { CandidateRelationalPersistenceModule } from '../../entities/candidate.relational.persistence.module';
import { RemoveUsecase } from './remove.usecase';
import { RemoveController } from './remove.controller';

@Module({
  imports: [CandidateRelationalPersistenceModule],
  providers: [RemoveUsecase],
  controllers: [RemoveController],
})
export class RemoveModule {}
