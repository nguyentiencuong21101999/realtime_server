import { Socket } from 'socket.io'
import { logger } from '../../helpers/logger'
import { SocketService } from '../../modules/socket/socket.service'

export const rootSocket = async (socketIO: SocketService) => {
    socketIO.io.on('connection', (socket: Socket) => {
        logger.info('user connected')

        // control
        socket.on('send-message', (message: string) => {
            console.log(message)
            socketIO.io.emit('send-message', 'abc')
        })

        socket.on('disconnect', () => {
            logger.info('user disconnect')
        })
    })
}
