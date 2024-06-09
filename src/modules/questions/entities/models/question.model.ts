import { ApiProperty } from '@nestjs/swagger';
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
import { InterviewResultModel } from '../../../interview/entities/models/interview.result.model';
import { TemplateQuestionModel } from '../../../templates/entities/models/template-question.entity';

@Entity('questions')
export class QuestionModel {
  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    example: 'some name',
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: 'boolean',
    nullable: false,
  })
  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isPublic: boolean;

  @ApiProperty({
    type: 'string',
    example: 'some name',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  hint: string;

  @ManyToOne(() => UserModel, (user) => user.questions)
  creator: UserModel;

  @ManyToMany(() => TagModel, (tag) => tag.questions, {
    cascade: ['update'],
  })
  @JoinTable()
  tags: TagModel[];

  @OneToMany(() => TemplateQuestionModel, (model) => model.question, {
    cascade: true,
  })
  @JoinTable()
  templateQuestion: TemplateQuestionModel[];

  @OneToMany(() => InterviewResultModel, (model) => model.question)
  @JoinTable()
  results: InterviewResultModel[];
}
