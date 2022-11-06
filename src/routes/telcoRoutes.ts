import express, {Router} from "express";
import TelcoController from "../controllers/telcoController";
import {
    TelcoSchema,
    CountrySchema,
    TelcoUpdateSchema,
    CountryUpdateSchema,
    PrefixPostSchema,
    PrefixUpdateSchema
} from "../middlewares/validators/telcoRequestSchema";
import {joiValidate} from "../middlewares";


const router: Router = express.Router();

router.post(
    '/country/create',
    joiValidate('body', CountrySchema),
    TelcoController.createCountry
)

router.get(
    '/country/list',
    TelcoController.listCountries
)

router.get(
    '/country/:id',
    TelcoController.getCountry
)

router.patch(
    '/country/update/:id',
    joiValidate('body', CountryUpdateSchema),
    TelcoController.updateCountry
)

router.post(
    '/telco/create',
    joiValidate('body', TelcoSchema),
    TelcoController.createTelco
)

router.get(
    '/telco/list',
    TelcoController.listTelcos
)

router.get(
    '/telco/:id',
    TelcoController.getTelco
)

router.patch(
    '/telco/update/:id',
    joiValidate('body', TelcoUpdateSchema),
    TelcoController.updateTelco
)

router.post(
    '/prefix/create',
    joiValidate('body', PrefixPostSchema),
    TelcoController.createPrefix
)

router.get(
    '/prefix/list',
    TelcoController.listPrefixes
)

router.get(
    '/prefix/:id',
    TelcoController.getPrefix
)

router.patch(
    './prefix/update/:id',
    joiValidate('body', PrefixUpdateSchema),
    TelcoController.updatePrefix
)


export default router;