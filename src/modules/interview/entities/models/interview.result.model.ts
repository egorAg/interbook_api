import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionModel } from '../../../questions/entities/models/question.model';
import { InterviewModel } from './interview.model';

@Entity('interview_results')
export class InterviewResultModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InterviewModel, (model) => model.result, {
    onDelete: 'CASCADE',
  })
  interview: InterviewModel;

  @ManyToOne(() => QuestionModel, (model) => model.results)
  question: QuestionModel;

  @Column()
  rate: number;

  @Column({ type: 'text', nullable: true })
  interviewNote?: string;
}
