import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Candidate } from '@/modules/candidate/entities/candidate.entity';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  adminId: number;

  @ManyToMany(() => User, (user) => user.spaces)
  users: User[];

  @OneToMany(() => Candidate, (candidate) => candidate.space)
  candidates: Candidate[];

  //todo
  // categories: string[];
  // questions: string[];
  // templates: string[];
  // interviews: string[];
}
