import { TagModel } from 'src/modules/tags/entities/models/tag.entity';
import { UserModel } from 'src/modules/user/entities/models/user.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
