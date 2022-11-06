import {
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    OneToOne
} from "typeorm";
import {ContactGroup} from "./contactGroup";
import {Telco} from "../telcos/telco";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    msisdn!: string

    @Column({
        nullable: true
    })
    field1!: string

    @Column({
        nullable: true
    })
    field2!: string

    @Column({
        nullable: true
    })
    field3!: string

    @Column({
        nullable: true
    })
    field4!: string

    @Column({
        nullable: true
    })
    field5!: string

    @Column({
        nullable: true
    })
    field6!: string

    @ManyToOne(
        () => Telco,
        (telco) => telco.contacts
    )
    telco!: Telco

    @ManyToOne(
        () => ContactGroup,
        (contactsGroup) => contactsGroup.contacts
    )
    group!: ContactGroup

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;
}