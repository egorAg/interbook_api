import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateQuestionModel } from './template-question.entity';
import { UserModel } from '../../../user/entities/models/user.model';

@Entity('templates')
export class TemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @Index({
    unique: true,
  })
  @Column({ type: 'varchar', length: '256' })
  name: string;

  @Column('text', { array: true, default: [] })
  order: string[];

  @OneToMany(() => TemplateQuestionModel, (model) => model.template, {
    cascade: true,
  })
  questions: TemplateQuestionModel[];

  @ManyToOne(() => UserModel, (model) => model.questions)
  user: UserModel;
}
