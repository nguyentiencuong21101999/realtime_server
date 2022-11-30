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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../helpers/utils");
const user_advance_model_1 = __importDefault(require("../models/user-advance.model"));
class CreateUserDTO {
}
CreateUserDTO.fromReq = (req) => {
    return (0, class_transformer_1.plainToInstance)(CreateUserDTO, req.body, {
        excludeExtraneousValues: true,
    });
};
CreateUserDTO.toUserAdvance = (dto) => {
    return (0, class_transformer_1.plainToInstance)(user_advance_model_1.default, dto);
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsIn)(['Mr', 'Ms']),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToTrim),
    (0, class_validator_1.Matches)(new RegExp("^[a-zA-Z][a-zA-Z '-]*$")),
    (0, class_validator_1.Length)(0, 32),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(utils_1.ToTrim),
    (0, class_validator_1.Length)(0, 32),
    (0, class_validator_1.Matches)(new RegExp("^[a-zA-Z][a-zA-Z '-]*$")),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "middleName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(utils_1.ToTrim),
    (0, class_validator_1.Length)(0, 32),
    (0, class_validator_1.Matches)(new RegExp("^[a-zA-Z][a-zA-Z '-]*$")),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "dob", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['M', 'F']),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsIn)(['AU']),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "countryCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "residentialAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^(?:\\+?(61))? ?(?:\\((?=.*\\)))?(0?[2-57-8])\\)? ?(\\d\\d(?:[- ](?=\\d{3})|(?!\\d\\d[- ]?\\d[- ]))\\d\\d[- ]?\\d[- ]?\\d{3})$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDTO.prototype, "isDepositLimit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "depositLimitValue", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([1, 7, 14, 30, 99]),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "depositLimitPeriodInHour", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^(?=[a-zA-Z0-9\\._-]{6,48})([a-zA-Z0-9]([._-]?[a-zA-Z0-9])*)$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsIP)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "userIp", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z0-9 ]+$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "stateAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z0-9 ]+$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "streetType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^[0-9][a-zA-Z0-9]*$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "streetNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z0-9 ]+$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "streetName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^[a-zA-Z -]+$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "suburbAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.Matches)(new RegExp('^[0-9]{4,4}$')),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "postcode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "deviceCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "deviceName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "tokenFireBase", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "devicePlatform", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "deviceVersion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "wolfdenAppVersion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "refCode", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "coloUserName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "coloPassword", void 0);
exports.CreateUserDTO = CreateUserDTO;
//# sourceMappingURL=user-create.dto.js.map