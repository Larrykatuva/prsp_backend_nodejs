import {load} from "ts-dotenv";


const env: any = load({
    PORT: Number,
    PRIVATE_KEY: String,

    EMAIL_USER: String,
    EMAIL_PORT: Number,
    EMAIL_HOST: String,
    EMAIL_SECURE: Boolean,
    EMAIL_HOST_PASSWORD: String,

    TEST_DB_TYPE: String,
    TEST_DB_URL: String
})

export default {
    NODE_ENV: 'test',
    dbType: env.TEST_DB_TYPE,
    dbUrl: env.TEST_DB_URL
}