import {Repository} from "typeorm";
import {databaseConfig} from "../../database/config";
import {TelcoService} from "../../database/entities/telcos/telcoService";
import {UpdateResult} from "typeorm/query-builder/result/UpdateResult";


export default class TelcoServiceHelper {
    private static telcoServiceRepository: Repository<TelcoService> = databaseConfig.getRepository(TelcoService);

    /**
     * Create telco service by provided name if it does not exist
     * @param telcoService
     */
    public static async createTelcoService(telcoService: TelcoService): Promise<TelcoService> {
        const exist: TelcoService | null = await this.telcoServiceRepository.findOneBy({
            name: telcoService.name,
            telco: telcoService.telco
        })
        if (exist) throw new Error(`Telco service by name: ${telcoService.name} already exist`)
        return await this.telcoServiceRepository.save(telcoService)
    }

    /**
     * Get one telco service by given options
     * @param filterOptions
     */
    public static async getOneTelcoService(filterOptions: any): Promise<TelcoService | null> {
        return await this.telcoServiceRepository.findOneBy({
            ...filterOptions
        })
    }

    /**
     * Get telco service by id
     * @param id
     */
    public static async getTelcoServiceById(id: string): Promise<TelcoService> {
        const telcoService: TelcoService | null = await this.getOneTelcoService({id: id})
        if (!telcoService) throw new Error('Invalid telco service id')
        return telcoService
    }

    /**
     * Filter telco service by given filter options
     * @param filterOptions
     */
    public static async filterTelcoServices(filterOptions: any): Promise<TelcoService[]> {
        return await this.telcoServiceRepository.find({
            where: {
                ...filterOptions
            }
        })
    }

    /**
     * Update telco service by id
     * @param id
     * @param telcoService
     */
    public static async updateTelcoService(id: string, telcoService: TelcoService): Promise<UpdateResult> {
        await this.getTelcoServiceById(id)
        return await this.telcoServiceRepository.update({
                id: id
            },
            telcoService
        )
    }

    /**
     * List telco services
     * @param order default ordering is by id ASC
     * @param pagination default pagination of offset = 0
     * and limit = 10
     * @param relations optional join table
     * @param filterOptions optional filter fields
     */
    public static async listTelcoServices(order: any, pagination: any, relations?: any, filterOptions?: any): Promise<[TelcoService[], number]> {
        if (filterOptions) {
            return await this.telcoServiceRepository.findAndCount({
                where: {
                    ...filterOptions
                },
                order: order,
                ...pagination,
                ...relations
            })
        }
        return await this.telcoServiceRepository.findAndCount({
            order: order,
            ...pagination,
            ...relations
        })
    }

}