import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { User } from "./user"

export enum UserRole {
    SUPERADMIN = "SUPERADMIN",
    SUPPORT = "SUPPORT",
    BUSINESS = "BUSINESS",
    CLIENTADMIN = "CLIENTADMIN",
    CLIENTUSER = "CLIENTUSER"
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CLIENTUSER,
    })
    role!: UserRole

    @ManyToMany(
        () => User, 
        user => user.roles
    )
    users!: User[]
}