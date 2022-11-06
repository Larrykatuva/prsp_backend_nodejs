import { Router } from 'express';
import { UserController } from '../controllers';
import express from 'express';
import {
    RegisterUser,
    LoginUser,
    ResetUser,
    ResetCode,
    SetNewPassword
} from "../middlewares/validators/authRequestSchema";
import {joiValidate} from "../middlewares";

const router: Router = express.Router();

router.post(
    '/register',
    joiValidate('body', RegisterUser),
    UserController.registerUser
);

router.post(
    '/login',
    joiValidate('body', LoginUser),
    UserController.loginUser
);

router.post(
    '/activate',
    joiValidate('body', ResetCode),
    UserController.verifyActivationCode
)

router.post(
    '/reset-code',
    joiValidate('body', ResetUser),
    UserController.requestResetCode
)

router.post(
    '/new-password',
    joiValidate('body', SetNewPassword),
    UserController.setNewPassword
)

export default router;