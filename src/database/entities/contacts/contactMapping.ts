import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    OneToOne
} from "typeorm";
import {ContactGroup} from "./contactGroup";

@Entity()
export class ContactMapping {
    @PrimaryGeneratedColumn()
    id!: string

    @OneToOne(
        () => ContactGroup,
        (contactGroup) => contactGroup.mapping
    )
    group!: ContactGroup

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

}

