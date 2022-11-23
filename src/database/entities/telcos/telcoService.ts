import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../auth/user";
import {Telco} from "./telco";

export enum ServiceType {
    SHORTCODE = "SHORTCODE",
    SENDERNAME = "SENDERNAME"
}

export enum CampaignType {
    PROMOTIONAL = "PROMOTIONAL",
    TRANSACTIONAL = "TRANSACTIONAL"
}

@Entity()
export class TelcoService {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    name!: string

    @Column({
        type: "enum",
        enum: ServiceType,
    })
    serviceType!: ServiceType

    @Column({
        type: "enum",
        enum: CampaignType,
        default: CampaignType.PROMOTIONAL
    })
    campaignType!: CampaignType

    @ManyToOne(
        () => User,
        (user) => user.telcoServices
    )
    owner!: User

    @ManyToOne(
        () => Telco,
        (telco) => telco.telcoServices
    )
    telco!: User
}