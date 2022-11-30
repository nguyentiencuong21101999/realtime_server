import express from 'express'
import { config } from './configs'
import { logger } from './helpers/logger'
import { rootSocket } from './modules-socket/chat/chat.route.soket'
import { SocketService } from './modules/socket/socket.service'

const app = express()
const port = process.env.PORT || 4000

const run = async () => {
    // await database.authenticate()
    // await redisService.connect()

    // app.set('trust proxy', true)
    // app.use(cors())
    // app.use(helmet())
    // app.use(express.json())
    // app.use(express.urlencoded({ extended: true }))
    // app.use(
    //     morgan('short', {
    //         skip: (req) => {
    //             return (
    //                 req.url.startsWith('/api/queues') ||
    //                 req.url.startsWith('/admin/queues') ||
    //                 req.url.startsWith('/healthcheck')
    //             )
    //         },
    //     })
    // )

    // app.use('/admin/queues', serverAdapter.getRouter())
    app.get('/healthcheck', async (req, res) => {
        res.send({ status: 'healthy' })
    })

    // // app.use('/users', userRouter)

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //     handleError(err, res)
    // })

    const server = app.listen(port, async () => {
        return logger.info(`Server is listening at port ${port}`)
    })

    //socket
    await rootSocket(new SocketService(config, server))
}

run().catch((e) => logger.error(e))
process.on('warning', (e) => logger.warn(e.stack))
