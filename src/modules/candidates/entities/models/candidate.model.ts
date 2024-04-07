import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CandidateGradeEnum } from '../../types/candidate.grade.enum';
import { UserModel } from '../../../user/entities/models/user.model';
import { InterviewModel } from '../../../interview/entities/models/interview.model';

@Entity()
export class CandidateModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  specialty: string;

  @Column({ default: CandidateGradeEnum.UNGRADED, enum: CandidateGradeEnum })
  grade: CandidateGradeEnum;

  @Column({ type: 'money', nullable: true })
  salary?: number;

  @Column({ nullable: true })
  experience?: string;

  @ManyToOne(() => UserModel, (user) => user.candidates)
  createdBy?: UserModel;

  @OneToMany(() => InterviewModel, (model) => model.candidate)
  interviews: InterviewModel[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
