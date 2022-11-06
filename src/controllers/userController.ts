import {Response, Request} from 'express';
import {UserHelper} from '../helpers';
import RequestUtils from './utils';

/**
 * Class to handle all user operations
 */
export default class UserController {
    /**
     * Register new user
     * @param req
     * @param res
     */
    static async registerUser(req: Request, res: Response) {
        try {
            const user = await UserHelper.registerUser(req.body)
            RequestUtils.handleRequestSuccess(res, 201)({
                user: user
            })
        } catch (err: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: err.message
            })
        }
    }

    /**
     * Login user
     * @param req
     * @param res
     * @return {Object} access token and user details
     */
    static async loginUser(req: Request, res: Response) {
        try {
            const loginResponse = await UserHelper.loginUser(req.body)
            RequestUtils.handleRequestSuccess(res, 200)(loginResponse)
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Activated registered user using the activation
     * code send via email
     * @param req
     * @param res
     */
    static async verifyActivationCode(req: Request, res: Response){
        const { body: { code } } = req
        try{
            const activationResponse: string = await UserHelper.verifyActivationCode(code);
            RequestUtils.handleRequestSuccess(res, 200)({
                message: activationResponse
            })
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Request a reset code which is sent via email
     * @param req
     * @param res
     */
    static async requestResetCode(req: Request, res: Response){
        const { body: { email } } = req
        try{
            const result: string = await UserHelper.requestResetCode(email)
            RequestUtils.handleRequestSuccess(res, 200)({
                message: result
            })
        } catch ( error: any ){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    /**
     * Set a new user password
     * @param req
     * @param res
     */
    static async setNewPassword(req: Request, res: Response){
        const { body: { code, password } } = req
        try{
            const result = await UserHelper.setNewPassword(code, password)
            RequestUtils.handleRequestSuccess(res, 200)({
                message: result
            })
        } catch (error: any) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }
}
