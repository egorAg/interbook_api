import { QuestionModel } from 'src/modules/questions/entities/models/question.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateEntity } from '../../../templates/entities/models/template.entity';
import { CandidateModel } from '../../../candidates/entities/models/candidate.model';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  login: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  password: string;

  @Column({
    nullable: true,
    type: 'varchar',
    name: 'refresh_token',
  })
  refreshToken: string;

  @OneToMany(() => QuestionModel, (question) => question.creator)
  questions: QuestionModel[];

  @OneToMany(() => TemplateEntity, (model) => model.user)
  templates: TemplateEntity[];

  @OneToMany(() => CandidateModel, (model) => model.createdBy)
  candidates: CandidateModel[];
}
