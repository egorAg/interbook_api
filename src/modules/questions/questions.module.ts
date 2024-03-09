import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '../tags/tags.module';
import { UserModule } from '../user/user.module';
import { QuestionsController } from './controllers/questions.controller';
import { QuestionModel } from './entities/models/question.model';
import { QuestionRepository } from './entities/repositories/question.repository';
import { QuestionsService } from './services/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel]), UserModule, TagsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository],
})
export class QuestionsModule {}
