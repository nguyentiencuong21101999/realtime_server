import { createClient, RedisClientType } from 'redis'
import { Config, config } from '../../configs'
import { logger } from '../../helpers/logger'
export class RedisService {
    conf: Config
    client: RedisClientType

    constructor(conf: Config) {
        this.conf = conf
        this.client = createClient({
            url: 'redis://redis-14901.c74.us-east-1-4.ec2.cloud.redislabs.com:14901',
        })
    }

    async connect() {
        try {
            await this.client.connect()
            logger.info('Redis connect successful!')
        } catch (error) {
            console.log(error)
        }
    }
}

export const redisService = new RedisService(config)
