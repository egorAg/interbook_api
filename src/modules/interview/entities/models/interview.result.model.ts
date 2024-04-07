import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InterviewModel } from './interview.model';
import { QuestionModel } from '../../../questions/entities/models/question.model';

@Entity('interview_results')
export class InterviewResultModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InterviewModel, (model) => model.result)
  interview: InterviewModel;

  @ManyToOne(() => QuestionModel, (model) => model.results)
  question: QuestionModel;

  @Column()
  rate: number;

  @Column({ type: 'text', nullable: true })
  interviewNote?: string;
}
