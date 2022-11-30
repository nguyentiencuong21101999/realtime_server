"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.mailService = exports.authMiddleware = exports.authService = void 0;
const configs_1 = require("./configs");
const auth_middleware_1 = require("./modules/auth/auth.middleware");
const auth_service_1 = require("./modules/auth/auth.service");
const mail_service_1 = require("./modules/mail/mail.service");
const mail_queue_service_1 = require("./modules/queue/mail-queue.service");
const redis_service_1 = require("./modules/redis/redis.service");
const user_service_1 = require("./modules/users/user.service");
exports.authService = new auth_service_1.AuthService(configs_1.config, redis_service_1.redisService);
exports.authMiddleware = new auth_middleware_1.AuthMiddleWare(exports.authService);
exports.mailService = new mail_service_1.MailService(configs_1.config, mail_queue_service_1.mailQueue);
exports.userService = new user_service_1.UserService(configs_1.config, exports.authService);
//# sourceMappingURL=services.js.map