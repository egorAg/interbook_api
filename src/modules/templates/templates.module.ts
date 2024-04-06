import { Module } from '@nestjs/common';
import { TemplatesController } from './controllers/templates.controller';
import { TemplatesService } from './services/templates.service';
import { TemplateRepository } from './entities/repositories/template.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entities/models/template.entity';
import { TemplateQuestionModel } from './entities/models/template-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity, TemplateQuestionModel])],
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplateRepository],
})
export class TemplatesModule {}
