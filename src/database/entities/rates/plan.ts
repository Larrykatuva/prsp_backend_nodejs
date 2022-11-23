import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Package} from "./package";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    title!: string

    @Column()
    description!: string

    @OneToMany(
        () => Package,
        (planPackage) => planPackage.plan
    )
    packages!: Package[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;
}