import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;
}
