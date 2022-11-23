import {
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne, OneToMany, ManyToMany, JoinTable
} from "typeorm";
import {Country} from "./country";
import {Prefix} from "./prefix";
import {Contact} from "../contacts/contact";
import {TelcoService} from "./telcoService";
import {Package} from "../rates/package";

@Entity()
export class Telco {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({unique: true})
    name!: string

    @Column({unique: true})
    code!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;

    @ManyToOne(
        () => Country,
        (country) => country.telcos
    )
    country!: Country

    @OneToMany(
        () => Prefix,
        (prefix) => prefix.telco
    )
    prefixes!: Prefix[]

    @OneToMany(
        () => Contact,
        (contact) => contact.telco
    )
    contacts!: Contact[]

    @OneToMany(
        () => TelcoService,
        (telcoService) => telcoService.telco
    )
    telcoServices!: TelcoService[]

    @ManyToMany(
        () => Package,
        telcoPackage => telcoPackage.telcos
    )
    @JoinTable()
    packages!: Package[]

}