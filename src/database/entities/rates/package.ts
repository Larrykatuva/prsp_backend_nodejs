import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import {Plan} from "./plan";
import {Telco} from "../telcos/telco";

@Entity()
export class Package {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    minVolume!: number

    @Column()
    maxVolume!: number

    @Column()
    rate!: number

    @ManyToOne(
        () => Plan,
        (plan) => plan.packages
    )
    plan!: Plan

    @ManyToMany(
        () => Telco,
        telco => telco.packages
    )
    @JoinTable()
    telcos!: Telco[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;
}