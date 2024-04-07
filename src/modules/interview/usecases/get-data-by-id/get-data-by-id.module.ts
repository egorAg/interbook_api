import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { GetDataByIdUsecase } from './get-data-by-id.usecase';
import { GetDataByIdController } from './get-data-by-id.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [GetDataByIdUsecase],
  controllers: [GetDataByIdController],
})
export class GetDataByIdModule {}
