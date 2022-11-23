import {DataSource} from "typeorm"
import {User} from "./entities/auth/user"
import {Role} from "./entities/auth/role"
import {Country} from "./entities/telcos/country";
import {Telco} from "./entities/telcos/telco";
import {Prefix} from "./entities/telcos/prefix";
import {ContactGroup} from "./entities/contacts/contactGroup";
import {Contact} from "./entities/contacts/contact";
import {ContactMapping} from "./entities/contacts/contactMapping";
import {Transaction} from "./entities/float/transaction";
import {Topup} from "./entities/float/topup";
import {FloatBalance} from "./entities/float/float";

export const databaseConfig = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "java",
    password: "password",
    database: "sms_node",
    synchronize: true,
    logging: true,
    entities: [User, Role, Country, Telco, Prefix,
        ContactGroup, Contact, ContactMapping, Transaction, Topup, FloatBalance],
    subscribers: [],
    migrations: [],
})