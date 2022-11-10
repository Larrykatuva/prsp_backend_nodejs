import {Request, Response, NextFunction} from "express";
import RequestUtils from "../controllers/utils";
import jwt from "jsonwebtoken";


/**
 * Auth guard to handle token authentication
 * @param req
 * @param res
 * @param next
 */
const authGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { headers: { authorization } } = req
        if(!authorization) throw new Error("No authentication was provided")
        const token: string | undefined = authorization?.split(" ")[1]
        if (!token) throw new Error("Invalid authentication headers")
        if (token){
            jwt.verify(token, 'qwerty',
                (error: any, user ) => {
                    if(error) throw new Error(error.message)
                    // @ts-ignore
                    req['user'] = user
                })
        }
        return next()
    } catch (error: any){
        RequestUtils.handleRequestFailure(res, 401)({
            message: error.message
        })
    }
}

export default authGuard;