import nodemailer, {SentMessageInfo, TestAccount, Transporter} from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {mailOptions} from "../../interface/mail";
import SendEmail from './sendEmail';

export default class NodeMailer extends SendEmail {

    /**
     * Generate test SMTP service account from ethereal.email
     * Only needed if you don't have a real mail account for testing
     * @private
     */
    private async createTestAccount(): Promise<TestAccount>{
        return await nodemailer.createTestAccount();
    }

    /**
     * Create reusable transporter object using the default SMTP transport
     * @private
     */
    private async createTransport(): Promise<Transporter<SMTPTransport.SentMessageInfo>>{
        const testAccount: TestAccount  = await this.createTestAccount();
        return nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    /**
     * Transport object to send the email.
     * @param to
     * @param subject
     * @param html
     * @private
     */
    private mailOptions(to: string, subject: string, html: any): mailOptions{
        return {
            from: '"Fred Foo 👻" <foo@example.com>',
            to: to,
            subject: subject,
            html: html
        }
    }

    /**
     * Send mail with defined transport object
     * @param to
     * @param subject
     * @param body
     */
    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const transport = await this.createTransport()
        transport.sendMail(
            this.mailOptions(to, subject, body),
            (error: Error | null, info : SentMessageInfo) => {
                console.log(error)
                console.log(info)
            }
        )
    }

}