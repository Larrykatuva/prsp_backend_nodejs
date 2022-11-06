import {load} from "ts-dotenv";


const env: any = load({
    PORT: Number,
    PRIVATE_KEY: String,

    EMAIL_USER: String,
    EMAIL_PORT: Number,
    EMAIL_HOST: String,
    EMAIL_SECURE: Boolean,
    EMAIL_HOST_PASSWORD: String,

    DEV_DB_TYPE: String,
    DEV_DB_URL: String
})

export default {
    privateKey: env.PRIVATE_KEY,
    port: env.PORT | 5000,
    node_mailer_config: {
        host: env.EMAIL_HOST,
        port: env.EMAIL_PORT,
        secure: env.EMAIL_SECURE,
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_HOST_PASSWORD
        }
    }
}