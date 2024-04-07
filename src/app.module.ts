import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionModel } from './modules/questions/entities/models/question.model';
import { QuestionsModule } from './modules/questions/questions.module';
import { TagModel } from './modules/tags/entities/models/tag.entity';
import { TagsModule } from './modules/tags/tags.module';
import { UserModel } from './modules/user/entities/models/user.model';
import { UserModule } from './modules/user/user.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { TemplateEntity } from './modules/templates/entities/models/template.entity';
import { TemplateQuestionModel } from './modules/templates/entities/models/template-question.entity';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { CandidateModel } from './modules/candidates/entities/models/candidate.model';
import { InterviewModel } from './modules/interview/entities/models/interview.model';
import { InterviewResultModel } from './modules/interview/entities/models/interview.result.model';
import { InterviewModule } from './modules/interview/interview.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        entities: [
          UserModel,
          TagModel,
          QuestionModel,
          TemplateEntity,
          TemplateQuestionModel,
          CandidateModel,
          InterviewModel,
          InterviewResultModel,
        ],
        host: config.getOrThrow('DB_HOST'),
        port: config.getOrThrow('DB_PORT'),
        username: config.getOrThrow('DB_USER'),
        password: config.getOrThrow('DB_PASS'),
        database: config.getOrThrow('DB_NAME'),
        synchronize: config.get<string>('NODE_ENV') === 'DEV',
        migrations: ['build/task/migrations/*.js'],
        migrationsTableName: 'migrations',
      }),
    }),
    UserModule,
    AuthModule,
    QuestionsModule,
    TagsModule,
    TemplatesModule,
    CandidatesModule,
    InterviewModule,
  ],
})
export class AppModule {}
