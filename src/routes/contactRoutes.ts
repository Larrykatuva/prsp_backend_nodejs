import { Router } from 'express';
import express from 'express';
import ContactsController from "../controllers/contactsController";

const router: Router = express.Router();

router.post(
    '/upload-csv',
    ContactsController.uploadCsv
)

router.get(
    '/groups',
    ContactsController.listContactGroups
)

router.get(
    '/group/:id',
    ContactsController.getContactGroupById
)

router.get(
    '/group/:id/contacts',
    ContactsController.getGroupContacts
)

export default router;