import { Router } from 'express';
import express from 'express';
import ContactsController from "../controllers/contactsController";

const router: Router = express.Router();

router.post(
    '/upload-csv',
    ContactsController.uploadCsv
)

export default router;