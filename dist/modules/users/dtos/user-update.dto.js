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
exports.UpdateUserAdminDTO = exports.UpdateUserDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../helpers/utils");
class UpdateUserDTO {
}
UpdateUserDTO.fromReq = (req) => {
    return (0, class_transformer_1.plainToInstance)(UpdateUserDTO, req.body, {
        excludeExtraneousValues: true,
    });
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Length)(0, 32),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(utils_1.ToTrim),
    (0, class_validator_1.Matches)(new RegExp("^[a-zA-Z][a-zA-Z '-]*$")),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Length)(0, 32),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(utils_1.ToTrim),
    (0, class_validator_1.Matches)(new RegExp("(^$)|(^[a-zA-Z][a-zA-Z '-]*$)")),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "middleName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Length)(0, 32),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(utils_1.ToTrim),
    (0, class_validator_1.Matches)(new RegExp("^[a-zA-Z][a-zA-Z '-]*$")),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "profileUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "bannerUrl", void 0);
__decorate([
    (0, class_validator_1.Length)(0, 50),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "motto", void 0);
__decorate([
    (0, class_validator_1.Length)(0, 280),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "bio", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isPrivateAccount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "residentialAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z0-9 ]+$')),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "stateAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z0-9 ]+$')),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "streetType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[0-9][a-zA-Z0-9]*$')),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "streetNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z0-9 ]+$')),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "streetName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z -]+$')),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "suburbAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['AU']),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "countryCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[0-9]{4,4}$')),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "postcode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "dob", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['Mr', 'Ms']),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['M', 'F']),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isWolfdenAccount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isAutoFollow", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isQuickBet", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
class UpdateUserAdminDTO extends UpdateUserDTO {
}
UpdateUserAdminDTO.fromReq = (req) => {
    return (0, class_transformer_1.plainToInstance)(UpdateUserAdminDTO, req.body, {
        excludeExtraneousValues: true,
    });
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^(?=[a-zA-Z0-9\\.@_-]{6,48})([a-zA-Z0-9]([.@_-]?[a-zA-Z0-9])*)$')),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserAdminDTO.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserAdminDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserAdminDTO.prototype, "coloUserName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserAdminDTO.prototype, "coloPassword", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^(?:\\+?(61))? ?(?:\\((?=.*\\)))?(0?[2-57-8])\\)? ?(\\d\\d(?:[- ](?=\\d{3})|(?!\\d\\d[- ]?\\d[- ]))\\d\\d[- ]?\\d[- ]?\\d{3})$')),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserAdminDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserAdminDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsIn)([2, 3, 4]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateUserAdminDTO.prototype, "roleId", void 0);
exports.UpdateUserAdminDTO = UpdateUserAdminDTO;
//# sourceMappingURL=user-update.dto.js.map