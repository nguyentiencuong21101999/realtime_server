"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("../../services");
const user_controller_1 = require("./user.controller");
const user_middleware_1 = require("./user.middleware");
const userController = new user_controller_1.UserController(services_1.userService);
const userMiddleware = new user_middleware_1.UserMiddleWare(services_1.authService);
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/sign-up', userMiddleware.tranformAndValidateCreateUserReq, userController.signUp);
exports.userRouter.post('/sign-in', userMiddleware.tranformAndValidateLoginReq, userController.signIn);
exports.userRouter.post('/sign-out', services_1.authMiddleware.authorization, userController.signOut);
//# sourceMappingURL=user.route.js.map