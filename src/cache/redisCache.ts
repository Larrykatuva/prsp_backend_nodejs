// import * as redis from 'redis';
const redis = require('redis')
import {createClient} from "redis";

export default class RedisCache {
    private static port: number = 6379
    private static host: string = '127.0.0.1'

    public static async saveToCache(){
        const redisClient = createClient()
        await redisClient.connect()
        await redisClient.on('connect',  () => {
            console.log('redis connected');
            console.log(`connected ${redisClient}`);
        }).on('error',  () => {
            console.log("Error");
        });
    }
}