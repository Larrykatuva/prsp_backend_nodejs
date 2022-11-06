import { Telco } from "../../database/entities/telcos/telco";
import { Repository } from "typeorm";
import { databaseConfig } from "../../database/config";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";


export default class TelcoHelper {
    private static telcoRepository: Repository<Telco> = databaseConfig.getRepository(Telco);

    /**
     * Creates telco and through error if supplied telco
     * name or code already exist
     * @param telco
     */
    public static async createTelco(telco: Telco): Promise<Telco> {
        const nameExists = await this.telcoRepository.findOneBy({
            name: telco.name
        })
        if (nameExists) throw new Error(`Telco by name: ${telco.name} already exists`)
        const codeExists = await this.telcoRepository.findOneBy({
            code: telco.code
        })
        if (codeExists) throw new Error(`Telco by code: ${telco.code} already exists`)
        return await this.telcoRepository.save(telco);
    }

    /**
     * Get a pagibated list of telcos
     * @param order default ordering if by id ASC
     * @param pagination default pagination has a
     * offset of 0 and a limit 10
     */
    public static async listTelcos(order: any, pagination: any, relations?: any): Promise<[Telco[], number]> {
        return await this.telcoRepository.findAndCount({
            order: order,
            ...pagination,
            ...relations
        });
    }

    /**
     * Get telco by id else throw error
     * @param id
     */
    public static async getTelcoById(id: string): Promise<Telco> {
        const telco: Telco | null = await this.telcoRepository.findOneBy({
            id: id
        })
        if (!telco) throw new Error('Invalid telco id')
        return telco
    }

    /**
     * Update telco by id
     * @param id
     * @param telco
     */
    public static async updateTelco(id: string, telco: Telco): Promise<UpdateResult> {
        await this.getTelcoById(id)
        return await this.telcoRepository.update({
            id: id
        },
            telco
        )
    }
}