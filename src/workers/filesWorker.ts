import Bull from "bull";
import ContactsHelper from "../helpers/contacts/ContactsHelper";
import Queue from "bull";

/**
 * Perform a background task processing using bull
 */
export default class FilesWorker {

    /**
     * Takes a file and pass it to the fileHandler class for processing
     * @param records
     * @param group
     */
    public static async uploadContacts(records: any, group: number) {
        const workerQueue = new Queue("workerQueue");
        const main = async () => {
            await workerQueue.add({ contacts: records, groupId: group });
        };
        workerQueue.process(
            async (job, done) => {
                const { data: { contacts, groupId } } = job
                await ContactsHelper.bulkyContactUpload(contacts, groupId)
                done();
            });
        main().catch(console.error);
    }

}