import { Queue } from 'bullmq'
import fs from 'fs'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { Config } from '../../configs'

export const MAIL_RESET_PASSWORD_TEMPLATE = 'reset-password'
export const MAIL_REPORT_FOR_RECIPIENT = 'report-for-recipient'
export const MAIL_REPORT_FOR_ADMIN = 'report-for-admin'
export const MAIL_WELCOME_USER = 'welcome-user'

export class MailService {
    config: Config
    transporter: nodemailer.Transporter
    queue: Queue

    constructor(config: Config, queue: Queue) {
        this.config = config
        this.transporter = nodemailer.createTransport({
            host: config.smtpEndpoint,
            port: Number(config.smtpPort),
            auth: {
                user: config.smtpUsername,
                pass: config.smtpPassword,
            },
        })
        this.queue = queue
    }

    sendMail = (msg: Mail.Options) =>
        new Promise((resolve, reject) => {
            this.transporter.sendMail(msg, (err, info) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(info)
            })
        })

    sendMailToQueue = async (msg: Mail.Options) => {
        await this.queue.add('mail', msg)
    }

    readTemplate = (name: string) =>
        new Promise<string>((resolve, reject) => {
            fs.readFile(
                `src/modules/mail/template/${name}.html`,
                (err, data) => {
                    if (err) return reject(err)
                    resolve(data.toString())
                }
            )
        })

    replacementContent = (content: string, replacement: object) => {
        Object.keys(replacement).forEach((key) => {
            content = content.replace(key, replacement[key])
        })
        return content
    }
}
