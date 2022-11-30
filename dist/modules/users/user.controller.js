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
exports.UserController = void 0;
const response_wrapper_1 = require("../../helpers/response.wrapper");
class UserController {
    constructor(userService) {
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.signUp(req.body);
                res.send(new response_wrapper_1.ResponseWrapper(user, null, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.signIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.signIn(req.body);
                res.send(new response_wrapper_1.ResponseWrapper(user, null, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.signOut = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers['authorization'];
                const [, token] = authHeader && authHeader.split(' ');
                const params = req.body;
                params.userId = req.userId;
                params.token = token;
                yield this.userService.signOut(params);
                res.send(new response_wrapper_1.ResponseWrapper(true, null, null));
            }
            catch (err) {
                next(err);
            }
        });
        this.userService = userService;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map