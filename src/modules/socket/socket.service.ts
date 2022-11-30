import http from 'http'
import socketIO from 'socket.io'
import { Config } from '../../configs'
export class SocketService {
    conf: Config
    io: socketIO.Server
    server: http.Server
    constructor(conf: Config, server: http.Server) {
        this.conf = conf
        this.io = new socketIO.Server(server, {
            cors: {
                origin: [
                    'https://idol-lady.vercel.app',
                    'http://localhost:3000',
                ],
                methods: ['GET', 'POST'],
                credentials: true,
            },
        })
    }
}
