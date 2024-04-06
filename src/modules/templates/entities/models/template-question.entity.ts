import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionModel } from '../../../questions/entities/models/question.model';
import { TemplateEntity } from './template.entity';

@Entity('template-questions')
export class TemplateQuestionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => QuestionModel, (model) => model.templateQuestion)
  question: QuestionModel;

  @ManyToOne(() => TemplateEntity, (model) => model.questions, {
    onDelete: 'CASCADE',
  })
  template: TemplateEntity;

  @Column({ nullable: true })
  note?: string;
}
