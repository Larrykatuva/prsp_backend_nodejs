import { Response, Request } from "express";
import * as fs from 'fs';
import { ReadStream } from "fs";
import { parse } from "csv-parse";
import RequestUtils from "./utils";
import ContactGroupHelper from "../helpers/contacts/contactGroupHelper";
import FilesWorker from "../workers/filesWorker";
import ContactsHelper from "../helpers/contacts/ContactsHelper";
import { ContactGroup } from "../database/entities/contacts/contactGroup";


export default class ContactsController {
    static async uploadCsv(req: any, res: Response) {
        const { files: { file } } = req;
        let record: any = []
        let keys: any = null
        const readStream: ReadStream = fs.createReadStream(file.path);
        readStream.pipe(
            parse({ delimiter: ",", columns: true, ltrim: true })
        ).on("data", async (row: any) => {
            if (!keys) {
                keys = ContactsHelper.extractContactMapping(row)
            }
            record.push(ContactsHelper.prepareContactValues(row))
        }).on("error", (error: any) => {
            RequestUtils.handleRequestFailure(res, 400)({
                error: error
            })
        }).on("end", async () => {
            try {
                const contactGroup: ContactGroup = await ContactGroupHelper.createContactGroup(
                    { ...req.body, contact_aggregate: 0, owner: 8 })
                await FilesWorker.uploadContacts(record, parseInt(contactGroup.id))
                RequestUtils.handleRequestSuccess(res, 201)({
                    message: 'Contacts upload in progress'
                })
            } catch (error: any) {
                RequestUtils.handleRequestFailure(res, 400)({
                    error: error.message
                })
            }
        })
    }
}
