import { DataTypes } from 'sequelize'
import { Column, PrimaryKey, Table } from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'
@Table({
    tableName: 'UserRole',
})
export default class UserRole extends BaseModel<UserRole> {
    @PrimaryKey
    @Column({
        field: 'UserId',
        type: DataTypes.INTEGER({ length: 11 }),
    })
    userId: number

    @PrimaryKey
    @Column({
        field: 'RoleId',
        type: DataTypes.INTEGER({ length: 11 }),
    })
    roleId: number
}

export enum UserRoleEnum {
    SuperAdmin = 1,
    Admin = 2,
    User = 3,
    Supporter = 4,
}
