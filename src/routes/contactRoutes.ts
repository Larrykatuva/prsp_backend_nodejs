import { Router } from 'express';
import express from 'express';
import ContactsController from "../controllers/contactsController";
import {AuthGuard} from "../guards";
import authGuard from "../guards/authGuard";

const router: Router = express.Router();

router.post(
    '/upload-csv',
    authGuard,
    ContactsController.uploadCsv
)

router.get(
    '/groups',
    authGuard,
    ContactsController.listContactGroups
)

router.get(
    '/group/:id',
    authGuard,
    ContactsController.getContactGroupById
)

router.get(
    '/group/:id/contacts',
    authGuard,
    ContactsController.getGroupContacts
)

export default router;