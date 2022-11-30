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
exports.AuthService = exports.AuthPayload = void 0;
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../../helpers/error");
const WD_ACCESS_TOKEN_KEY = 'wd_access_token';
const WD_BLACKLIST_TOKEN_KEY = 'wd_blacklist_token';
const WD_ACCOUNT_POSITION_KEY = 'wd_account_position_key';
class AuthPayload {
}
exports.AuthPayload = AuthPayload;
class AuthService {
    constructor(conf, redisService) {
        this.conf = conf;
        this.redis = redisService;
    }
    signToken(userId, uuid, roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sign = jsonwebtoken_1.default.sign({
                userId: userId.toString(),
                uuid: uuid,
                roleId: roleId.toString(),
            }, this.conf.secretKey);
            yield this.addAccessToken(userId, sign);
            return sign;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(token, this.conf.secretKey, {
                complete: true,
            });
            const authPayload = (0, class_transformer_1.plainToInstance)(AuthPayload, (0, class_transformer_1.instanceToPlain)(decoded.payload));
            const tokens = yield this.getAccessTokens(authPayload.userId);
            if (!tokens.has(token)) {
                throw error_1.Errors.Unauthorized;
            }
            return authPayload;
        });
    }
    setToken(key, hash, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redis.client.hSet(key, hash, token);
        });
    }
    getAccessTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.redis.client.hGet(WD_ACCESS_TOKEN_KEY, userId.toString());
            if (res != null) {
                return new Set(res.split(','));
            }
            return new Set();
        });
    }
    addAccessToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.getAccessTokens(userId);
            tokens.add(token);
            yield this.setToken(WD_ACCESS_TOKEN_KEY, userId.toString(), [...tokens].join(','));
        });
    }
    removeAccessToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.getAccessTokens(userId);
            tokens.delete(token);
            yield this.setToken(WD_ACCESS_TOKEN_KEY, userId.toString(), [...tokens].join(','));
        });
    }
    removeAllAccessTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setToken(WD_ACCESS_TOKEN_KEY, userId.toString(), '');
        });
    }
    invalidateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setToken(WD_BLACKLIST_TOKEN_KEY, token, '');
        });
    }
    isInvalidToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redis.client
                    .hExists(WD_BLACKLIST_TOKEN_KEY, token)
                    .then((val) => resolve(val))
                    .catch((err) => reject(err));
            });
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map