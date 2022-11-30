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
exports.UserMiddleWare = void 0;
const class_validator_1 = require("class-validator");
const validator_1 = require("../../helpers/validator");
const user_create_dto_1 = require("./dtos/user-create.dto");
const user_update_dto_1 = require("./dtos/user-update.dto");
const user_dto_1 = require("./dtos/user.dto");
class UserMiddleWare {
    constructor(authService) {
        this.tranformAndValidateCreateUserReq = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body = user_create_dto_1.CreateUserDTO.fromReq(req);
                if (!req.body.isDepositLimit) {
                    req.body.depositLimitValue = 1;
                    req.body.depositLimitPeriodInHour = 99;
                }
                yield (0, class_validator_1.validateOrReject)(req.body);
                next();
            }
            catch (err) {
                next((0, validator_1.parseValidationError)(err));
            }
        });
        this.tranformAndValidateLoginReq = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clientIp = req.header('x-forwarded-for');
                req.body = user_dto_1.LoginDTO.fromReq(req);
                req.body.clientIp = clientIp;
                req.body.userAgent = req.get('User-Agent');
                yield (0, class_validator_1.validateOrReject)(req.body);
                next();
            }
            catch (err) {
                next((0, validator_1.parseValidationError)(err));
            }
        });
        // uploadAvatar = async (
        //     req: BodyRequest<UpdateUserDTO>,
        //     res: Response,
        //     next: NextFunction
        // ) => {
        //     const dir = userAssetDir(req.uuid, StorageDir.Profiles)
        //     const uploadHandler = uploadImage(dir, 'avatar').single('image')
        //     uploadHandler(req, res, (err: unknown) => {
        //         if (err) {
        //             next(err)
        //             return
        //         }
        //         const file = req && req.file && instanceToPlain(req.file)
        //         if (file && file['key']) {
        //             req.body.profileUrl = file['key']
        //         }
        //         next()
        //     })
        // }
        // uploadBanner = async (
        //     req: BodyRequest<UpdateUserDTO>,
        //     res: Response,
        //     next: NextFunction
        // ) => {
        //     const dir = userAssetDir(req.uuid, StorageDir.Profiles)
        //     const uploadHandler = uploadImage(dir, 'banner').single('image')
        //     uploadHandler(req, res, (err: unknown) => {
        //         if (err) {
        //             next(err)
        //             return
        //         }
        //         const file = req.file && instanceToPlain(req.file)
        //         if (file && file['key']) {
        //             req.body.bannerUrl = file['key']
        //         }
        //         next()
        //     })
        // }
        this.tranformAndValidateUpdateUserReq = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body = user_update_dto_1.UpdateUserDTO.fromReq(req);
                yield (0, class_validator_1.validateOrReject)(req.body);
                next();
            }
            catch (err) {
                next((0, validator_1.parseValidationError)(err));
            }
        });
        this.authService = authService;
    }
}
exports.UserMiddleWare = UserMiddleWare;
//# sourceMappingURL=user.middleware.js.map