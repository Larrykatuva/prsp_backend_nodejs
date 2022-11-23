import {Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../auth/user";
import {Topup} from "./topup";


@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    amount!: number

    @Column()
    phone!: string

    @Column()
    transactionDesc!: string

    @Column()
    merchantRequestID!: string

    @Column()
    checkoutRequestID!: string

    @Column()
    resultCode!: string

    @Column()
    resultDesc!: string

    @Column()
    mpesaReceiptNumber!: string

    @Column()
    transactionDate!: string

    @Column()
    paymentStatus!: string

    @ManyToOne(
        () => User,
        (user) => user.transactions
    )
    owner!: User

    @OneToOne(
        () => Topup,
        (topup) => topup.transaction
    )
    topup!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;

}