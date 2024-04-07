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
import { InterviewResultModel } from '../../../interview/entities/models/interview.result.model';
import { ApiProperty } from '@nestjs/swagger';

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

  @OneToMany(() => InterviewResultModel, (model) => model.question)
  @JoinTable()
  results: InterviewResultModel[];
}
