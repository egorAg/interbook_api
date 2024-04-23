import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateEntity } from '../../../templates/entities/models/template.entity';
import { CandidateModel } from '../../../candidates/entities/models/candidate.model';
import { InterviewResultModel } from './interview.result.model';
import { UserModel } from '../../../user/entities/models/user.model';
import { InterviewStatusEnum } from '../../types/interview-status.enum';

@Entity('interview')
export class InterviewModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isResultPublished: boolean;

  @Column({
    type: 'date',
    default: 'NOW()',
  })
  date: Date;

  @Column({
    type: 'enum',
    enum: InterviewStatusEnum,
    default: InterviewStatusEnum.PLANNED,
  })
  status: InterviewStatusEnum;

  @ManyToOne(() => TemplateEntity, (model) => model.interviews)
  template: TemplateEntity;

  @ManyToOne(() => UserModel, (model) => model.interviews)
  user: UserModel;

  @OneToMany(() => InterviewResultModel, (model) => model.interview)
  result: InterviewResultModel[];

  @ManyToOne(() => CandidateModel, (model) => model.interviews, {
    onDelete: 'SET NULL',
  })
  candidate: CandidateModel;
}
