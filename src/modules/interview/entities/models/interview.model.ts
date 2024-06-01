import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CandidateModel } from '../../../candidates/entities/models/candidate.model'
import { TemplateEntity } from '../../../templates/entities/models/template.entity'
import { UserModel } from '../../../user/entities/models/user.model'
import { InterviewStatusEnum } from '../../types/interview-status.enum'
import { InterviewResultModel } from './interview.result.model'

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

  @Column({
    type: 'varchar',
    nullable: true,
  })
  finalFeedback: string;

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
