import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserData } from '@/modules/user/entities/user-data.entity';
import { Space } from '@/modules/spaces/entities/space.entity';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direction: string;

  @OneToOne(() => UserData)
  @JoinColumn()
  userData: UserData;

  @ManyToOne(() => Space, (space) => space.candidates)
  space: Space;

  //todo
  // results: any
}
