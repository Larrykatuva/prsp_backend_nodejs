import { Prefix } from "../../database/entities/telcos/prefix";
import { Repository } from "typeorm";
import { databaseConfig } from "../../database/config";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";


export default class PrefixHelper {

    private static prefixRepository: Repository<Prefix> = databaseConfig.getRepository(Prefix);

    /**
     * Create telco prefix
     * @param prefix
     */
    public static async createPrefix(prefix: Prefix): Promise<Prefix> {
        const exists: Prefix | null = await this.prefixRepository.findOneBy({
            prefix: prefix.prefix
        })
        if (exists) throw new Error(`Prefix: ${prefix.prefix} already exists`)
        return await this.prefixRepository.save(prefix)
    }

    /**
     * Get telco prefix by id
     * @param id
     */
    public static async getPrefixById(id: string): Promise<Prefix | null> {
        return await this.prefixRepository.findOneBy({
            id: id
        })
    }

    /**
     * Update telco prefix by id
     * @param id
     * @param prefix
     */
    public static async updatePrefix(id: string, prefix: Prefix): Promise<UpdateResult> {
        if (!await this.getPrefixById(id)) throw new Error(`Country id: ${id} is invalid`)
        return await this.prefixRepository.update({
            id: id
        },
            prefix
        )
    }

    /**
     * Get a paginated list of telco prefixes
     * @param order
     * @param pagination
     * @param relations
     */
    public static async listPrefixes(order: any, pagination: any, relations?: any): Promise<[Prefix[], number]> {
        return await this.prefixRepository.findAndCount({
            order: order,
            ...pagination,
            ...relations
        })
    }

    /**
     * Get telco by prefix
     * @param prefix
     * @private
     */
    private static async getTelcoByPrefix(prefix: string): Promise<Prefix | null> {
        return await this.prefixRepository.findOne({
            where: {
                prefix: prefix
            },
            relations: ['telco']
        })
    }


}