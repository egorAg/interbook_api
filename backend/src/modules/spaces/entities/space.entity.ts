import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@/modules/user/entities/user.entity";

@Entity()
export class Space {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    adminId: number;

    @ManyToMany(() => User, user => user.spaces)
    users: User[]

    //todo
    // categories: string[];
    // questions: string[];
    // candidates: string[];
    // templates: string[];
    // interviews: string[];
}