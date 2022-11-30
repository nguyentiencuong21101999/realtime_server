import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import Mail from 'nodemailer/lib/mailer'
import { config } from '../../configs'
import { mailService } from '../../services'

const ioRedis = new IORedis(config.redisUri, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
})

export const mailQueue = new Queue('mail', {
    connection: ioRedis,
    defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: 1000,
    },
})

export const mailWorker = new Worker<Mail.Options>(
    'mail',
    async (job) => {
        await mailService.sendMail(job.data)
    },
    { connection: ioRedis }
)
