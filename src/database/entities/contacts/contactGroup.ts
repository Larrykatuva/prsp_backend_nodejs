import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne, JoinColumn
} from "typeorm";
import {User} from "../auth/user";
import {Contact} from "./contact";
import {ContactMapping} from "./contactMapping";

@Entity()
export class ContactGroup {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    contact_aggregate!: string

    @ManyToOne(
        () => User,
        (user) => user.contactGroups
    )
    owner!: User

    @OneToMany(
        () => Contact,
        (contact) => contact.group
    )
    contacts!: Contact[]

    @OneToOne(
        () => ContactMapping,
        contactMapping => contactMapping.group
    )
    @JoinColumn()
    mapping!: ContactMapping
}