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
exports.redisService = exports.RedisService = void 0;
const redis_1 = require("redis");
const configs_1 = require("../../configs");
const logger_1 = require("../../helpers/logger");
class RedisService {
    constructor(conf) {
        this.conf = conf;
        this.client = (0, redis_1.createClient)({
            url: 'redis://redis-14901.c74.us-east-1-4.ec2.cloud.redislabs.com:14901',
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                logger_1.logger.info('Redis connect successful!');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.RedisService = RedisService;
exports.redisService = new RedisService(configs_1.config);
//# sourceMappingURL=redis.service.js.map