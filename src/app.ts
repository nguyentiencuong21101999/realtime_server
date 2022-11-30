import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from './configs'
import { database } from './database/connection'
import { handleError } from './helpers/error'
import { logger } from './helpers/logger'
import { rootSocket } from './modules-socket/chat/chat.route.soket'
import { serverAdapter } from './modules/queue/queue.service'
import { redisService } from './modules/redis/redis.service'
import { SocketService } from './modules/socket/socket.service'
import { userRouter } from './modules/users/user.route'

const app = express()
const port = config.port

const run = async () => {
    await database.authenticate()
    await redisService.connect()

    app.set('trust proxy', true)
    app.use(cors())
    app.use(helmet())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(
        morgan('short', {
            skip: (req) => {
                return (
                    req.url.startsWith('/api/queues') ||
                    req.url.startsWith('/admin/queues') ||
                    req.url.startsWith('/healthcheck')
                )
            },
        })
    )

    app.use('/admin/queues', serverAdapter.getRouter())
    app.get('/healthcheck', async (req, res) => {
        res.send({ status: 'healthy' })
    })

    app.use('/users', userRouter)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        handleError(err, res)
    })

    const server = app.listen(port, async () => {
        return logger.info(`Server is listening at port ${port}`)
    })

    //socket
    await rootSocket(new SocketService(config, server))
}

run().catch((e) => logger.error(e))
process.on('warning', (e) => logger.warn(e.stack))
