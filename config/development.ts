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
    NODE_ENV: 'development',
    dbType: env.DEV_DB_TYPE,
    dbUrl: env.DEV_DB_URL
}