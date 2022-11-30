import { Socket } from 'socket.io'
import { logger } from '../../helpers/logger'
import { SocketService } from '../../modules/socket/socket.service'

interface CommentDetail {
    comment: string
    time: Date
}
const commentDetailList: CommentDetail[] = []
let totalLikes: number = 0
export const rootSocket = async (socketIO: SocketService) => {
    socketIO.io.on('connection', (socket: Socket) => {
        logger.info('user connected')

        //get comment
        socket.on('get-comment-list', () => {
            socketIO.io.sockets
                .in(socket.id)
                .emit('return-comment-list', commentDetailList)
        })

        // comment
        socket.on('comment', (commnetDetail: CommentDetail) => {
            commentDetailList.push(commnetDetail)
            socketIO.io.emit('return-comment-list', commentDetailList)
        })

        //get like
        socket.on('get-total-like', () => {
            socketIO.io.sockets
                .in(socket.id)
                .emit('return-total-like', totalLikes)
        })

        //like
        socket.on('like', (totalLike: number) => {
            totalLikes = totalLike
            socketIO.io.emit('return-total-like', totalLike)
        })
        socket.on('disconnect', () => {
            logger.info('user disconnect')
        })
    })
}
