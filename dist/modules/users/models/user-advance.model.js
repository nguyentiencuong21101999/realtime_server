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
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_enity_1 = require("../../base/base.enity");
let UserAdvance = class UserAdvance extends base_enity_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ field: 'UserId' }),
    __metadata("design:type", Number)
], UserAdvance.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(512), field: 'Motto' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "motto", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(512), field: 'Bio' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "bio", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(128), field: 'BannerUrl' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "bannerUrl", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Default)('AU'),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(5), field: 'CountryCode' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "countryCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(256), field: 'ResidentialAddress' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "residentialAddress", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(128), field: 'ColoUserName' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "coloUserName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(128), field: 'ColoPassword' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "coloPassword", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(255), field: 'ColoToken' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "coloToken", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(128), field: 'StateAddress' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "stateAddress", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(10), field: 'StreetNumber' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "streetNumber", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(255), field: 'StreetName' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "streetName", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(10), field: 'StreetType' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "streetType", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(128), field: 'SuburbAddress' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "suburbAddress", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.STRING(10), field: 'Postcode' }),
    __metadata("design:type", String)
], UserAdvance.prototype, "postcode", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BIGINT, field: 'LastUserLoginTrackingId' }),
    __metadata("design:type", Number)
], UserAdvance.prototype, "lastUserLoginTrackingId", void 0);
UserAdvance = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'UserAdvance' })
], UserAdvance);
exports.default = UserAdvance;
//# sourceMappingURL=user-advance.model.js.map