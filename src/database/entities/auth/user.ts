import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
} from "typeorm"
import {Role} from "./role"
import {Prefix} from "../telcos/prefix";
import {ContactGroup} from "../contacts/contactGroup";
import {Transaction} from "../float/transaction";
import {Topup} from "../float/topup";
import {TelcoService} from "../telcos/telcoService";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column({unique: true})
    @Index({unique: true})
    email!: string

    @Column({nullable: true})
    code!: string

    @Column({default: false})
    isActive!: boolean

    @Column()
    password!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;

    @ManyToMany(
        () => Role,
        role => role.users
    )
    @JoinTable()
    roles!: Role[]

    @OneToMany(
        () => ContactGroup,
        (contactGroups) => contactGroups.owner
    )
    contactGroups!: ContactGroup[]

    @OneToMany(
        () => Transaction,
        (transaction) => transaction.owner
    )
    transactions!: Transaction[]

    @OneToMany(
        () => Topup,
        (topup) => topup.owner
    )
    topups!: Transaction[]

    @OneToMany(
        () => TelcoService,
        (telcoService) => telcoService.owner
    )
    telcoServices!: TelcoService[]

}