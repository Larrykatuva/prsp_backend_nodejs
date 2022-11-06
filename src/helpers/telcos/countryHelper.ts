import { Country } from "../../database/entities/telcos/country";
import { Repository } from "typeorm";
import { databaseConfig } from "../../database/config";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";


export default class CountryHelper {
    private static countryRepository: Repository<Country> = databaseConfig.getRepository(Country);

    /**
     * Creates country and through error if supplied country
     * name or code already exist
     * @param country
     */
    public static async createCountry(country: Country): Promise<Country> {
        const nameExists = await this.countryRepository.findOneBy({
            name: country.name
        })
        if (nameExists) throw new Error(`Country by name: ${country.name} already exists`)
        const codeExists = await this.countryRepository.findOneBy({
            code: country.code
        })
        if (codeExists) throw new Error(`Country by code: ${country.code} already exists`)
        return await this.countryRepository.save(country);
    }

    /**
     * Get country by country id else throw error
     * @param id
     */
    public static async getCountryById(id: string): Promise<Country> {
        const country: Country | null = await this.countryRepository.findOneBy({
            id: id
        })
        if (!country) throw new Error('Invalid country id')
        return country
    }

    /**
     * Update country by id
     * @param id
     * @param country
     */
    public static async updateCountry(id: string, country: Country): Promise<UpdateResult> {
        await this.getCountryById(id);
        return await this.countryRepository.update({
            id: id
        },
            country
        )
    }

    /**
     * List countries
     * @param order default ordering by id ASC
     * @param pagination default pagination of offset = 0
     * and limit = 10
     * @param relations optional join tables
     */
    public static async listCountries(order: any, pagination: any, relations?: any): Promise<[Country[], number]> {
        return await this.countryRepository.findAndCount({
            order: order,
            ...pagination,
            ...relations
        });
    }
}