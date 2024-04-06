import { TagModel } from 'src/modules/tags/entities/models/tag.entity';
import { UserModel } from 'src/modules/user/entities/models/user.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateQuestionModel } from '../../../templates/entities/models/template-question.entity';

@Entity('questions')
export class QuestionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ManyToOne(() => UserModel, (user) => user.questions)
  creator: UserModel;

  @ManyToMany(() => TagModel, (tag) => tag.questions, {
    cascade: ['update'],
  })
  @JoinTable()
  tags: TagModel[];

  @OneToMany(() => TemplateQuestionModel, (model) => model.question)
  @JoinTable()
  templateQuestion: TemplateQuestionModel[];
}
