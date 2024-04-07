import { Module } from '@nestjs/common';
import { InterviewRelationalPersistenceModule } from '../../entities/interview.relational.persistence.module';
import { ChangeVisibilityUsecase } from './change-visibility.usecase';
import { ChangeVisibilityController } from './change-visibility.controller';

@Module({
  imports: [InterviewRelationalPersistenceModule],
  providers: [ChangeVisibilityUsecase],
  controllers: [ChangeVisibilityController],
})
export class ChangeVisibilityModule {}
