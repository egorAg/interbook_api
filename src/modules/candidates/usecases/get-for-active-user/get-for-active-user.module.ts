import { Module } from '@nestjs/common';
import { CandidateRelationalPersistenceModule } from '../../entities/candidate.relational.persistence.module';
import { GetForActiveUserUsecase } from './get-for-active-user.usecase';
import { GetForActiveUserController } from './get-for-active-user.controller';

@Module({
  imports: [CandidateRelationalPersistenceModule],
  providers: [GetForActiveUserUsecase],
  controllers: [GetForActiveUserController],
})
export class GetForActiveUserModule {}
