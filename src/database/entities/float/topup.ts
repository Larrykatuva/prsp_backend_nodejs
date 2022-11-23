import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../auth/user";
import {Transaction} from "./transaction";

@Entity()
export class Topup {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    package!: string

    @Column()
    rate!: number

    @Column()
    smsUnits!: number

    @OneToOne(
        () => Transaction,
        (transaction) => transaction.topup
    )
    @JoinColumn()
    transaction!: string

    @ManyToOne(
        () => User,
        (user) => user.topups
    )
    owner!: User

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;
}