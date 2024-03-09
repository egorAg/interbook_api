import { QuestionModel } from 'src/modules/questions/entities/models/question.model';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class TagModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ManyToMany(() => QuestionModel, (question) => question.tags)
  questions: QuestionModel[];
}
