import { QuestionModel } from 'src/modules/questions/entities/models/question.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
