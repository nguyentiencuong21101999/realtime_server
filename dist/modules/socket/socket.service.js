"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
class SocketService {
    constructor(conf, server) {
        this.conf = conf;
        this.io = new socket_io_1.default.Server(server, {
            cors: {
                origin: ['http://localhost:8080'],
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map