"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootSocket = void 0;
const logger_1 = require("../../helpers/logger");
const rootSocket = (socketIO) => __awaiter(void 0, void 0, void 0, function* () {
    socketIO.io.on('connection', (socket) => {
        logger_1.logger.info('user connected');
        // control
        socket.on('send-message', (message) => {
            console.log(message);
            socketIO.io.emit('send-message', 'abc');
        });
        socket.on('disconnect', () => {
            logger_1.logger.info('user disconnect');
        });
    });
});
exports.rootSocket = rootSocket;
//# sourceMappingURL=chat.route.soket.js.map