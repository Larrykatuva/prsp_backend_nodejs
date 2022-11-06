import {
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    OneToMany
} from "typeorm";
import { Telco } from "./telco";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({ unique: true })
    name!: string

    @Column({ unique: true })
    code!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;

    @OneToMany(
        () => Telco,
        (telco) => telco.country
    )
    telcos!: Telco[]
}