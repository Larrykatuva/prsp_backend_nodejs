import { Repository} from "typeorm";
import {databaseConfig} from "../../database/config";
import {UpdateResult} from "typeorm/query-builder/result/UpdateResult";
import {ContactGroup} from "../../database/entities/contacts/contactGroup";


export default class ContactGroupHelper {

    private static contactGroupRepository: Repository<ContactGroup> = databaseConfig.getRepository(ContactGroup)

    /**
     * Create a new contact group
     * @param contactGroup
     */
    public static async createContactGroup(contactGroup: ContactGroup): Promise<ContactGroup> {
        const exists = await this.contactGroupRepository.findOneBy({
            name: contactGroup.name
        })
        if (exists) throw new Error(`Contact group name: ${contactGroup.name} already exists`)
        return await this.contactGroupRepository.save(contactGroup)
    }

    /**
     * Get contact group by id
     * @param id
     */
    public static async getContactGroupById(id: string): Promise<ContactGroup> {
        const contactGroup: ContactGroup | null = await this.contactGroupRepository.findOneBy({
            id: id
        })
        if (!contactGroup) throw new Error("Invalid contact group Id")
        return contactGroup
    }

    /**
     * Update country group by id
     * @param id
     * @param contactGroup
     */
    public static async updateContactGroup(id: string, contactGroup: ContactGroup): Promise<UpdateResult> {
        await this.getContactGroupById(id)
        return await this.contactGroupRepository.update({
            id: id
        },
            contactGroup
        )
    }

    /**
     * Get a list of paginated contact groups
     * @param order
     * @param pagination
     * @param relations
     */
    public static async listContactGroups(order: any, pagination: any, relations?: any): Promise<[ContactGroup[], number]> {
        return await this.contactGroupRepository.findAndCount({
            order: order,
            ...pagination,
            ...relations
        })
    }
}