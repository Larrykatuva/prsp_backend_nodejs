import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    Index
} from "typeorm";
import { Telco } from "./telco";

@Entity()
export class Prefix {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({unique: true})
    @Index({unique: true})
    prefix!: string

    @ManyToOne(
        () => Telco,
        (telco) => telco.prefixes
    )
    telco!: Telco
}
