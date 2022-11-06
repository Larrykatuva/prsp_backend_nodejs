import {Request, Response, NextFunction} from "express";
import RequestUtils from "../controllers/utils";

const extractData = (req: Request, source: string): any => {
    switch (source){
        case 'query':
            return req.query
        case 'body':
            return req.body
        case 'params':
            return req.params
        default:
            break;
    }
}

/**
 * This middleware receives a source: name if what you want to
 * validate and schema: representation of joi validation
 * rules
 * @param source
 * @param schema
 */
export default function joiValidate(source: string, schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(extractData(req, source))
        if (error) {
            return RequestUtils.handleRequestFailure(res, 422)({
                message: error.message
            })
        }
        return next();
    }
}

