import { Contact } from "../../database/entities/contacts/contact";
import { EntityManager, Repository } from "typeorm";
import { databaseConfig } from "../../database/config";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { Prefix } from "../../database/entities/telcos/prefix";
import { RedisCache } from "../../cache";

export default class ContactsHelper {
    private static contactRepository: Repository<Contact> = databaseConfig.getRepository(Contact);

    /**
     * Get a single contact by id
     * @param id
     */
    public static async getCountryById(id: string): Promise<Contact> {
        const contact: Contact | null = await this.contactRepository.findOneBy({
            id: id
        })
        if (!contact) throw new Error("Invalid contact id")
        return contact
    }

    /**
     * Update a contact by id
     * @param id
     * @param contact
     */
    public static async updateContactById(id: string, contact: Contact): Promise<UpdateResult> {
        await this.getCountryById(id)
        return await this.contactRepository.update({
            id: id
        },
            contact
        )
    }

    /**
     * Get a paginated list of contacts
     * @param order
     * @param pagination
     * @param relations
     * @param filters
     */
    public static async listContacts(order: any, pagination: any, relations?: any, filters?: any):
        Promise<[Contact[], number]> {
        console.log(filters)
        return await this.contactRepository.findAndCount({
            order: order,
            ...filters,
            ...pagination,
            ...relations
        })
    }

    /**
     * Prepare contact records with their corresponding fields
     * @param row
     */
    public static prepareContactValues(row: any): any {
        const values: any = Object.values(row)
        const phoneNumber = values[0].toString().trim()
        return {
            msisdn: phoneNumber,
            field1: values[1],
            field2: values[2],
            field3: values[3],
            field4: values[4],
            field5: values[5],
            field6: values[6]
        }
    }

    /**
     * Extract contact mapping from csv row header
     * @param row
     */
    public static extractContactMapping(row: any): any {
        const keys: any[] = Object.keys(row)
        return {
            msisdn: 'msisdn',
            field1: keys[1],
            field2: keys[2],
            field3: keys[3],
            field4: keys[4],
            field5: keys[5],
            field6: keys[6]
        }
    }

    /**
     * Extract the phone number part required to determine its
     * telco/service provider
     * @param phoneNumber
     */
    public static extractContactTelco(phoneNumber: string): string {
        if (phoneNumber.length == 13) {
            return phoneNumber.substring(2, 4)
        }
        else if (phoneNumber.length == 12) {
            return phoneNumber.slice(3, 6)
        }
        else if (phoneNumber.length == 10) {
            return phoneNumber.slice(1, 4)
        }
        else if (phoneNumber.length == 9) {
            return phoneNumber.slice(0, 3)
        }
        else {
            return ''
        }

    }

    private static async getPhoneNumberTelco(phoneNumber: string,
        transactionalEntityManager: EntityManager): Promise<number | null> {
        const prefix: string = this.extractContactTelco(phoneNumber)
        // await RedisCache.saveToCache()
        console.log("Prefix =>", prefix)
        if (prefix) {
            //Check if prefix exists in the cache
            //If no prefix in the cache
            const telco = await transactionalEntityManager.findOne(Prefix, {
                where: {
                    prefix: prefix
                },
                relations: ['telco']
            })
            if (telco) {
                //Save to chache
                // @ts-ignore
                return telco.telco.id
            }
        }
        return null
    }

    /**
     * Bulky contact upload to the database using transactional
     * entity manager
     * @param contacts
     * @param groupId
     */
    public static async bulkyContactUpload(contacts: Contact[], groupId: number): Promise<void> {
        await databaseConfig.transaction(
            async (transactionalEntityManager) => {
                for (let i: number = 0; i < contacts.length; i++) {
                    const telcoId = await this.getPhoneNumberTelco(contacts[i].msisdn, transactionalEntityManager)
                    if (telcoId) {
                        // @ts-ignore
                        await transactionalEntityManager.save(Contact, { ...contacts[i], telco: telcoId, group: groupId })
                    }
                }
            }
        )
    }
}