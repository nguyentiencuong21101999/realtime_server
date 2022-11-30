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
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const connection_1 = require("../../../database/connection");
const sprocs_1 = require("../../../database/sprocs");
const base_enity_1 = require("../../base/base.enity");
const user_dto_1 = require("../dtos/user.dto");
let User = class User extends base_enity_1.BaseModel {
    static getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield (0, connection_1.execProc)(user_dto_1.UserProfileDTO, sprocs_1.Sprocs.UserGetProfile, {
                replacements: [userId],
                plain: true,
            });
            return profile;
        });
    }
    static getProfileByUUID(userId, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield (0, connection_1.execProc)(user_dto_1.UserPublicProfileDTO, sprocs_1.Sprocs.UserGetProfileByUUID, {
                replacements: [userId, uuid],
                plain: true,
            });
            return profile;
        });
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ field: 'UserId' }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Default)(sequelize_1.UUIDV4),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(255), field: 'UUID' }),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'UserName' }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(255), field: 'Pass' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(5), field: 'Title' }),
    __metadata("design:type", String)
], User.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('M'),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(5), field: 'Gender' }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'FirstName' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(''),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'MiddleName' }),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(32), field: 'LastName' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(128), field: 'FullName' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(64),
        field: 'Email',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.DATEONLY, field: 'DOB' }),
    __metadata("design:type", String)
], User.prototype, "dob", void 0);
__decorate([
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(16),
        field: 'PhoneNumber',
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, field: 'RefUserId' }),
    __metadata("design:type", Number)
], User.prototype, "refUserId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING(128),
        field: 'ProfileUrl',
    }),
    __metadata("design:type", String)
], User.prototype, "profileUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN, field: 'IsPrivateAccount' }),
    __metadata("design:type", Boolean)
], User.prototype, "isPrivateAccount", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN, field: 'IsWolfdenAccount' }),
    __metadata("design:type", Boolean)
], User.prototype, "isWolfdenAccount", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(1),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN, field: 'IsTurnOnCopyBet' }),
    __metadata("design:type", Boolean)
], User.prototype, "isTurnOnCopyBet", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN, field: 'IsDepositLimit' }),
    __metadata("design:type", Boolean)
], User.prototype, "isDepositLimit", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.DECIMAL(15, 2), field: 'DepositLimitValue' }),
    __metadata("design:type", Number)
], User.prototype, "depositLimitValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(1),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.DECIMAL(6, 1),
        field: 'DepositLimitPeriodInHour',
    }),
    __metadata("design:type", Number)
], User.prototype, "depositLimitPeriodInHour", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN, field: 'IsAuthenticProfile' }),
    __metadata("design:type", Boolean)
], User.prototype, "isAuthenticProfile", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN, field: 'IsQuickBet' }),
    __metadata("design:type", Boolean)
], User.prototype, "isQuickBet", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.DATE,
        field: 'AuthenticProfileDate',
    }),
    __metadata("design:type", String)
], User.prototype, "authenticProfileDate", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    (0, sequelize_typescript_1.Column)({ field: 'DeletedDate' }),
    __metadata("design:type", Date)
], User.prototype, "deletedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ field: 'IsBlocked', type: sequelize_1.DataTypes.SMALLINT }),
    __metadata("design:type", Boolean)
], User.prototype, "isBlocked", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'BlockedDate', type: sequelize_1.DataTypes.DATE }),
    __metadata("design:type", Date)
], User.prototype, "blockedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ field: 'CloseAccountType', type: sequelize_1.DataTypes.SMALLINT }),
    __metadata("design:type", Number)
], User.prototype, "closeAccountType", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN, field: 'IsAutoFollow' }),
    __metadata("design:type", Boolean)
], User.prototype, "isAutoFollow", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'User', paranoid: true })
], User);
exports.default = User;
//# sourceMappingURL=user.model.js.map