import {Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class FloatBalance {
    @PrimaryGeneratedColumn()
    id!: string
}