import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateQuestionModel } from './template-question.entity';
import { UserModel } from '../../../user/entities/models/user.model';
import { InterviewModel } from '../../../interview/entities/models/interview.model';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionModel } from '../../../questions/entities/models/question.model';

@Entity('templates')
export class TemplateEntity {
  @ApiProperty({
    type: 'string',
    example: 'some-uuid-v4-here',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'boolean',
    example: 'false',
  })
  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @ApiProperty({
    type: 'string',
    example: 'Junior frontend',
  })
  @Index({
    unique: true,
  })
  @Column({ type: 'varchar', length: '256' })
  name: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['uuid-1', 'uuid-2'],
  })
  @Column('text', { array: true, default: [] })
  order: string[];

  @ApiProperty({
    type: TemplateQuestionModel,
    example: [TemplateQuestionModel],
    isArray: true,
  })
  @OneToMany(() => TemplateQuestionModel, (model) => model.template, {
    cascade: true,
  })
  questions: TemplateQuestionModel[];

  @ManyToOne(() => UserModel, (model) => model.questions)
  user: UserModel;

  @OneToMany(() => InterviewModel, (model) => model.template)
  @JoinTable()
  interviews: InterviewModel[];
}
