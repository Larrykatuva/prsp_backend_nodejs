import { Response, Request } from 'express';
import * as Url from "url";
import axios from "axios";

export default class RequestUtils {

    /**
     * Handle success request response
     * default response statusCode = 200
     * @param res
     * @param statusCode
     */
    static handleRequestSuccess<T>(res: Response, statusCode: number = 200) {
        return (body: T) => {
            res.status(statusCode).send({
                status: statusCode,
                success: true,
                ...body
            })
        }
    }

    /**
     * Handle failed request response
     * default response statusCode = 400
     * @param res
     * @param statusCode
     */
    static handleRequestFailure(res: Response, statusCode: number = 400){
        return (body: any) => {
            res.status(statusCode).send({
                status: statusCode,
                success: false,
                ...body
            })
        }
    }

    /**
     * Handle paginated response
     * default pagination offset = 0 and limit = 10
     * default response statusCode = 200
     * @param res
     * @param req
     * @param statusCode
     */
    static handlePaginationResponse<T>(res: Response, req: Request, statusCode: number = 200){
        return (body: T, count: number) => {
            res.status(statusCode).send({
                status: statusCode,
                success: false,
                count: count,
                ...body
            })
        }
    }
}