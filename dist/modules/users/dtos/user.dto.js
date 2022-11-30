"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerifyDTO = exports.UserPublicProfileDTO = exports.UserProfileDTO = exports.UserDTO = exports.LoginDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../helpers/utils");
class LoginDTO {
}
LoginDTO.fromReq = (req) => {
    return (0, class_transformer_1.plainToInstance)(LoginDTO, req.body, {
        excludeExtraneousValues: true,
    });
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "deviceCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "deviceName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "tokenFireBase", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "devicePlatform", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "deviceVersion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "wolfdenAppVersion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "clientIp", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "userAgent", void 0);
exports.LoginDTO = LoginDTO;
class UserDTO {
}
UserDTO.fromUser = (user) => {
    const res = (0, class_transformer_1.plainToInstance)(UserDTO, user.get(), {
        excludeExtraneousValues: true,
    });
    return res;
};
UserDTO.fromUserWolfdenAccount = (user) => {
    const res = (0, class_transformer_1.plainToInstance)(UserDTO, user, {
        excludeExtraneousValues: true,
    });
    return res;
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'uUID' }),
    __metadata("design:type", String)
], UserDTO.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "middleName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'dOB' }),
    __metadata("design:type", String)
], UserDTO.prototype, "dob", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isDepositLimit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "depositLimitValue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "depositLimitPeriodInHour", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToFullUrl),
    __metadata("design:type", String)
], UserDTO.prototype, "profileUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isPrivateAccount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isWolfdenAccount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isAutoFollow", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isTurnOnCopyBet", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isAuthenticProfile", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isDeleted", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isBlocked", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "followStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isQuickBet", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserDTO.prototype, "closeAccountType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDTO.prototype, "accessToken", void 0);
exports.UserDTO = UserDTO;
class UserProfileDTO extends UserDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "motto", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "bio", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToFullUrl),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "bannerUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "countryCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "residentialAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "stateAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "streetNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "streetName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "streetType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "suburbAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "postcode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserProfileDTO.prototype, "roleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserProfileDTO.prototype, "coloUserName", void 0);
exports.UserProfileDTO = UserProfileDTO;
class UserPublicProfileDTO {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'uUID' }),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "uuid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "middleName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToFullUrl),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "profileUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserPublicProfileDTO.prototype, "isPrivateAccount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserPublicProfileDTO.prototype, "isAuthenticProfile", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "motto", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "bio", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToFullUrl),
    __metadata("design:type", String)
], UserPublicProfileDTO.prototype, "bannerUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserPublicProfileDTO.prototype, "isFollowing", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], UserPublicProfileDTO.prototype, "followStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserPublicProfileDTO.prototype, "isFollower", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserPublicProfileDTO.prototype, "roleId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToBoolean),
    __metadata("design:type", Boolean)
], UserPublicProfileDTO.prototype, "isUserBlocked", void 0);
exports.UserPublicProfileDTO = UserPublicProfileDTO;
class UserVerifyDTO {
}
UserVerifyDTO.fromReq = (req) => {
    const res = (0, class_transformer_1.plainToInstance)(UserVerifyDTO, req.body, {
        excludeExtraneousValues: true,
    });
    return res;
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserVerifyDTO.prototype, "verifyUserId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserVerifyDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserVerifyDTO.prototype, "isVerify", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserVerifyDTO.prototype, "roleId", void 0);
exports.UserVerifyDTO = UserVerifyDTO;
//# sourceMappingURL=user.dto.js.map