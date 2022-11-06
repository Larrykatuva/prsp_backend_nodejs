import { Repository} from "typeorm";
import {databaseConfig} from "../../database/config";
import {UpdateResult} from "typeorm/query-builder/result/UpdateResult";
import {ContactMapping} from "../../database/entities/contacts/contactMapping";

export class ContactGroupMapping {
    private static contactGroupMappingRepository: Repository<ContactMapping> = databaseConfig.getRepository(ContactMapping);

    /**
     * Create contact group contact mapping
     * @param contactMapping
     */
    public static async createContactMapping(contactMapping: ContactMapping): Promise<ContactMapping> {
        const exist: ContactMapping | null = await this.contactGroupMappingRepository.findOneBy({
            group: contactMapping.group
        })
        if (exist) throw new Error(`Group mapping for group: ${contactMapping.group.name} already exists`)
        return await this.contactGroupMappingRepository.save(contactMapping)
    }

    /**
     * Get a group contact mapping by id
     * @param id
     */
    public static async getContactMappingById(id: string): Promise<ContactMapping> {
        const contactMapping: ContactMapping | null = await this.contactGroupMappingRepository.findOneBy({
            id: id
        })
        if (!contactMapping) throw new Error("Invalid contact mapping id")
        return contactMapping
    }

    /**
     * Update contact group mapping
     * @param id
     * @param contactMapping
     */
    public static async updateContactMapping(id: string, contactMapping: ContactMapping): Promise<UpdateResult> {
        await this.getContactMappingById(id)
        return await this.contactGroupMappingRepository.update({
            id: id
        },
            contactMapping
        )
    }
}