import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserData {
  @PrimaryGeneratedColumn()
  id: number;
}
