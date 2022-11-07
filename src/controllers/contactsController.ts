import { Response, Request } from "express";
import * as fs from 'fs';
import { ReadStream } from "fs";
import { parse } from "csv-parse";
import RequestUtils from "./utils";
import ContactGroupHelper from "../helpers/contacts/contactGroupHelper";
import FilesWorker from "../workers/filesWorker";
import ContactsHelper from "../helpers/contacts/ContactsHelper";
import { ContactGroup } from "../database/entities/contacts/contactGroup";
import {getOrdering, getPagination} from "../middlewares/requestOptions";


export default class ContactsController {
    static async uploadCsv(req: Request, res: Response) {
        // @ts-ignore
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

    static async listContactGroups(req: Request, res: Response){
        const ordering = getOrdering(req)
        const pagination = getPagination(req)
        try {
            const [contactGroups, count ] = await ContactGroupHelper.listContactGroups(
                ordering,
                pagination
            )
            RequestUtils.handlePaginationResponse(res, req, 200)({
                contactGroups
            }, count)
        } catch (error: any){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    static async getContactGroupById(req: Request, res: Response) {
        const { params: { id } } = req
        try {
            const contactGroup: ContactGroup = await ContactGroupHelper.getContactGroupById(id)
            RequestUtils.handleRequestSuccess(res, 200)({
                contactGroup: contactGroup
            })
        } catch ( error: any ){
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }

    static async getGroupContacts(req: Request, res: Response){
        const { params: { id } } = req
        const ordering = getOrdering(req)
        const pagination = getPagination(req)
        try {
            const [ contacts, count ] = await ContactsHelper.listContacts(
                ordering,
                pagination,
                {relations: ['group']},
                { where: { group: {id: parseInt(id) } } }
            )
            RequestUtils.handlePaginationResponse(res, req, 200)({
                contacts
            }, count)
        } catch ( error: any ) {
            RequestUtils.handleRequestFailure(res, 400)({
                message: error.message
            })
        }
    }
}
