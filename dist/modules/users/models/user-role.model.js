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
exports.UserRoleEnum = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_enity_1 = require("../../base/base.enity");
let UserRole = class UserRole extends base_enity_1.BaseModel {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        field: 'UserId',
        type: sequelize_1.DataTypes.INTEGER({ length: 11 }),
    }),
    __metadata("design:type", Number)
], UserRole.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        field: 'RoleId',
        type: sequelize_1.DataTypes.INTEGER({ length: 11 }),
    }),
    __metadata("design:type", Number)
], UserRole.prototype, "roleId", void 0);
UserRole = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'UserRole',
    })
], UserRole);
exports.default = UserRole;
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum[UserRoleEnum["SuperAdmin"] = 1] = "SuperAdmin";
    UserRoleEnum[UserRoleEnum["Admin"] = 2] = "Admin";
    UserRoleEnum[UserRoleEnum["User"] = 3] = "User";
    UserRoleEnum[UserRoleEnum["Supporter"] = 4] = "Supporter";
})(UserRoleEnum = exports.UserRoleEnum || (exports.UserRoleEnum = {}));
//# sourceMappingURL=user-role.model.js.map