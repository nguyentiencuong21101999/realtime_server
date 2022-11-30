"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = require("../../database/connection");
const error_1 = require("../../helpers/error");
const utils_1 = require("../../helpers/utils");
const user_create_dto_1 = require("./dtos/user-create.dto");
const user_role_model_1 = __importStar(require("./models/user-role.model"));
const user_model_1 = __importDefault(require("./models/user.model"));
class UserService {
    constructor(conf, authService) {
        this.signUp = (params) => __awaiter(this, void 0, void 0, function* () {
            // validate user info
            yield this.validateUserRegistrationInfo(params);
            let newUserId;
            let roleId;
            let refUserId;
            yield connection_1.database.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                //if refCode => referral
                if (params.refCode) {
                    refUserId = yield this.userReferral(params.refCode, true);
                }
                // create wolfden user
                params.fullName = (0, utils_1.genFullName)(params.firstName, params.middleName, params.lastName);
                params.password = yield bcrypt_1.default.hash(params.password, 10);
                const user = yield user_model_1.default.create(Object.assign(Object.assign({}, params), { refUserId: refUserId }), { transaction });
                newUserId = user.userId;
                //create user role
                const userRoleDTO = {
                    userId: newUserId,
                    roleId: user_role_model_1.UserRoleEnum.User,
                };
                const userRole = yield user_role_model_1.default.create(userRoleDTO);
                roleId = userRole.roleId;
                // create wolfden user advance info
                const userAdvance = user_create_dto_1.CreateUserDTO.toUserAdvance(params);
                userAdvance.userId = user.userId;
                yield userAdvance.save({ transaction });
            }));
            const user = yield user_model_1.default.findOne({ where: { userId: newUserId } });
            const token = yield this.authService.signToken(user.userId, user.uuid, roleId);
            const profile = yield user_model_1.default.getProfile(user.userId);
            profile.accessToken = token;
            return profile;
        });
        this.signIn = (params) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                where: { userName: params.userName },
            });
            if (user == null) {
                throw error_1.Errors.InvalidAccount;
            }
            const isValidPassword = bcrypt_1.default.compareSync(params.password, user.password);
            if (!isValidPassword) {
                //throw err : login
                throw error_1.Errors.InvalidAccount;
            }
            const userRole = yield user_role_model_1.default.findOne({
                where: { userId: user.userId },
            });
            const token = yield this.authService.signToken(user.userId, user.uuid, userRole.roleId);
            const profile = yield user_model_1.default.getProfile(user.userId);
            profile.accessToken = token;
            return profile;
        });
        this.signOut = (params) => __awaiter(this, void 0, void 0, function* () {
            yield this.authService.removeAccessToken(params.userId, params.token);
        });
        this.userReferral = (uuid, isFinished) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                where: {
                    uuid: uuid,
                    isBlocked: 0,
                },
            });
            if (!user || (user === null || user === void 0 ? void 0 : user.isBlocked)) {
                throw error_1.Errors.RefCodeNotFound;
            }
            if (isFinished) {
                return user.userId;
            }
        });
        this.validateUserRegistrationInfo = (params) => __awaiter(this, void 0, void 0, function* () {
            if (params.userName) {
                const existedUsername = yield user_model_1.default.findOne({
                    where: { userName: params.userName },
                    paranoid: false,
                });
                if (existedUsername) {
                    throw error_1.Errors.AlreadyHaveWolfdenAccount;
                }
            }
            if (params.email) {
                const existedEmail = yield user_model_1.default.findOne({
                    where: { email: params.email },
                    paranoid: false,
                });
                if (existedEmail) {
                    throw error_1.Errors.ExistedEmail;
                }
            }
            if (params.phoneNumber) {
                const existedPhoneNumber = yield user_model_1.default.findOne({
                    where: { phoneNumber: params.phoneNumber },
                    paranoid: false,
                });
                if (existedPhoneNumber) {
                    throw error_1.Errors.ExistedPhoneNumber;
                }
            }
        });
        this.conf = conf;
        this.authService = authService;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map