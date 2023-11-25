import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Space } from '@/modules/spaces/entities/space.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isActive: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Space, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  workspace: Space;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
