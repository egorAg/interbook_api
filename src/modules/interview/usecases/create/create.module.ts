import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { CreateUsecase } from './create.usecase';
import { CreateController } from './create.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [CreateUsecase],
  controllers: [CreateController],
})
export class CreateModule {}
