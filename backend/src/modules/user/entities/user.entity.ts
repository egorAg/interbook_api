import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { UserData } from "@/modules/user/entities/user-data.entity";
import { Space } from "@/modules/spaces/entities/space.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    nullable: true
  })
  refreshToken: string;

  @OneToOne(() => UserData)
  @JoinColumn()
  userData: UserData;

  @ManyToMany(() => Space, space => space.users, {cascade: true})
  @JoinTable()
  spaces: Space[]
}
