import {Response, Request} from "express";
import RequestUtils from "./utils";
import {TelcoHelper, CountryHelper, PrefixHelper} from "../helpers/telcos";
import {Telco} from "../database/entities/telcos/telco";
import {Country} from "../database/entities/telcos/country";
import {UpdateResult} from "typeorm/query-builder/result/UpdateResult";
import {getOrdering} from "../middlewares/requestOptions";
import {getPagination} from "../middlewares/requestOptions";
import {Prefix} from "../database/entities/telcos/prefix";

/**
 * Class to handle all telcos operations
 */
export default class TelcoController {

    /**
     * Create country by name and code
     * @param req
     * @param res
     * @return {Object} of created country
     */
    static async createCountry(req: Request, res: Response){
        try{
            const county: Country = await CountryHelper.createCountry(req.body)
            RequestUtils.handleRequestSuccess(res, 201)({
                country: county
            })
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Get country by id
     * @param req
     * @param res
     * @return {Object} country matching th id
     */
    static async getCountry(req: Request, res: Response){
        const { params: { id } } = req
        try{
            const country: Country = await CountryHelper.getCountryById(id)
            RequestUtils.handleRequestSuccess(res, 200)({
                country: country
            })
        } catch (error: any){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Update country by id
     * @param req
     * @param res
     * @return {Object} typeorm update result
     */
    static async updateCountry(req: Request, res: Response){
        const { params: { id } } = req
        try{
            const country: UpdateResult = await CountryHelper.updateCountry(id, req.body)
            RequestUtils.handleRequestSuccess(res, 200)({
                country
            })
        } catch ( error: any ){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Create telco
     * @param req
     * @param res
     * @return {Object} created telco
     */
    static async createTelco(req: Request, res: Response){
        try{
            const telco: Telco = await TelcoHelper.createTelco(req.body)
            RequestUtils.handleRequestSuccess(res, 201)({
                telco: telco
            })
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Get a paginated list of all telcos
     * @param req
     * @param res
     * @return {telcos[]} of telcos
     */
    static async listTelcos(req: Request, res: Response){
        const ordering = getOrdering(req)
        const pagination = getPagination(req)
        try {
            const [ telcos, count ] = await TelcoHelper.listTelcos(
                ordering,
                pagination,
                {relations: ['country']}
            )
            RequestUtils.handlePaginationResponse(res, req, 200)({
                telcos
            }, count)
        } catch ( error: any ){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Get telco by id
     * @param req
     * @param res
     * @return {Object} telco matching the id
     */
    static async getTelco(req: Request, res: Response){
        const { params: { id } } = req
        try{
            const telco: Telco = await TelcoHelper.getTelcoById(id)
            RequestUtils.handleRequestSuccess(res, 200)({
                telco: telco
            })
        } catch ( error: any ){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Update telco by id
     * @param req
     * @param res
     * @return {Object} typeorm update result
     */
    static async updateTelco( req: Request, res: Response){
        const { params: { id } } = req
        try{
            const telco: UpdateResult = await TelcoHelper.updateTelco(id, req.body)
            RequestUtils.handleRequestSuccess(res, 200)({
                telco
            })
        } catch ( error: any ){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Get paginated list of countries
     * @param req
     * @param res
     */
    static async listCountries(req: Request, res: Response){
        const ordering = getOrdering(req)
        const pagination = getPagination(req)
        try {
            const [ countries, count ] = await CountryHelper.listCountries(
                ordering,
                pagination
            )
            RequestUtils.handlePaginationResponse(res, req, 200)({
                countries
            }, count)
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Create new telco prefix
     * @param req
     * @param res
     */
    static async createPrefix(req: Request, res: Response){
        try {
            const prefix: Prefix = await PrefixHelper.createPrefix(req.body)
            RequestUtils.handleRequestSuccess(res, 201)({
                prefix
            })
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Get a telco prefix by id
     * @param req
     * @param res
     */
    static async getPrefix(req: Request, res: Response){
        const { params: { id } } = req
        try {
            const prefix: Prefix | null = await PrefixHelper.getPrefixById(id)
            RequestUtils.handleRequestSuccess(res, 200)({
                prefix
            })
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Update telco prefix
     * @param req
     * @param res
     */
    static async updatePrefix(req: Request, res: Response){
        const { params: { id } } = req
        try {
            const updated: UpdateResult = await PrefixHelper.updatePrefix(id, req.body)
            RequestUtils.handleRequestSuccess(res, 200)({
                updated
            })
        } catch ( error: any ){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Get a paginated list of prefixes
     * @param req
     * @param res
     */
    static async listPrefixes(req: Request, res: Response){
        const order = getOrdering(req)
        const pagination  = getPagination(req)
        try {
            const [prefixes, count] = await PrefixHelper.listPrefixes(
                order,
                pagination,
                { relations: ['telco', 'telco.country']}
            )
            RequestUtils.handlePaginationResponse(res, req, 200)({
                prefixes
            }, count)
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }
}