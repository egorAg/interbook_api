import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionModel } from '../../../questions/entities/models/question.model';
import { TemplateEntity } from './template.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('template-questions')
export class TemplateQuestionModel {
  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: QuestionModel,
    example: QuestionModel,
    isArray: false,
  })
  @ManyToOne(() => QuestionModel, (model) => model.templateQuestion)
  question: QuestionModel;

  @ManyToOne(() => TemplateEntity, (model) => model.questions, {
    onDelete: 'CASCADE',
  })
  template: TemplateEntity;

  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  @Column({ nullable: true })
  note?: string;
}
