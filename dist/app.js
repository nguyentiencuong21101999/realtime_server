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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const configs_1 = require("./configs");
const error_1 = require("./helpers/error");
const logger_1 = require("./helpers/logger");
const chat_route_soket_1 = require("./modules-socket/chat/chat.route.soket");
const queue_service_1 = require("./modules/queue/queue.service");
const socket_service_1 = require("./modules/socket/socket.service");
const app = (0, express_1.default)();
const port = configs_1.config.port || 4000;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    // await database.authenticate()
    // await redisService.connect()
    app.set('trust proxy', true);
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)('short', {
        skip: (req) => {
            return (req.url.startsWith('/api/queues') ||
                req.url.startsWith('/admin/queues') ||
                req.url.startsWith('/healthcheck'));
        },
    }));
    app.use('/admin/queues', queue_service_1.serverAdapter.getRouter());
    app.get('/healthcheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ status: 'healthy' });
    }));
    // app.use('/users', userRouter)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, req, res, next) => {
        (0, error_1.handleError)(err, res);
    });
    const server = app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        return logger_1.logger.info(`Server is listening at port ${port}`);
    }));
    //socket
    yield (0, chat_route_soket_1.rootSocket)(new socket_service_1.SocketService(configs_1.config, server));
});
run().catch((e) => logger_1.logger.error(e));
process.on('warning', (e) => logger_1.logger.warn(e.stack));
//# sourceMappingURL=app.js.map