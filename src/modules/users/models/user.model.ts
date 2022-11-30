import { DataTypes, UUIDV4 } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    Column,
    Default,
    DeletedAt,
    Index,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript'
import { execProc } from '../../../database/connection'
import { Sprocs } from '../../../database/sprocs'
import { BaseModel } from '../../base/base.enity'
import { UserProfileDTO, UserPublicProfileDTO } from '../dtos/user.dto'

@Table({ tableName: 'User', paranoid: true })
export default class User extends BaseModel<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'UserId' })
    userId: number

    @Unique
    @Default(UUIDV4)
    @Column({ type: DataTypes.STRING(255), field: 'UUID' })
    uuid: string

    @Index
    @Column({ type: DataTypes.STRING(32), field: 'UserName' })
    userName: string

    @AllowNull
    @Column({ type: DataTypes.STRING(255), field: 'Pass' })
    password: string

    @Column({ type: DataTypes.STRING(5), field: 'Title' })
    title: string

    @Default('M')
    @Column({ type: DataTypes.STRING(5), field: 'Gender' })
    gender: string

    @Column({ type: DataTypes.STRING(32), field: 'FirstName' })
    firstName: string

    @Default('')
    @Column({ type: DataTypes.STRING(32), field: 'MiddleName' })
    middleName: string

    @Column({ type: DataTypes.STRING(32), field: 'LastName' })
    lastName: string

    @Column({ type: DataTypes.STRING(128), field: 'FullName' })
    fullName: string

    @Index
    @Column({
        type: DataTypes.STRING(64),
        field: 'Email',
    })
    email: string

    @AllowNull
    @Column({ type: DataTypes.DATEONLY, field: 'DOB' })
    dob: string

    @Index
    @Column({
        type: DataTypes.STRING(16),
        field: 'PhoneNumber',
    })
    phoneNumber: string

    @AllowNull
    @Column({ type: DataTypes.INTEGER, field: 'RefUserId' })
    refUserId: number

    @AllowNull
    @Column({
        type: DataTypes.STRING(128),
        field: 'ProfileUrl',
    })
    profileUrl: string

    @Default(0)
    @Column({ type: DataTypes.BOOLEAN, field: 'IsPrivateAccount' })
    isPrivateAccount: boolean

    @Default(0)
    @Column({ type: DataTypes.BOOLEAN, field: 'IsWolfdenAccount' })
    isWolfdenAccount: boolean

    @Default(1)
    @Column({ type: DataTypes.BOOLEAN, field: 'IsTurnOnCopyBet' })
    isTurnOnCopyBet: boolean

    @Default(0)
    @Column({ type: DataTypes.BOOLEAN, field: 'IsDepositLimit' })
    isDepositLimit: boolean

    @Default(0)
    @Column({ type: DataTypes.DECIMAL(15, 2), field: 'DepositLimitValue' })
    depositLimitValue: number

    @Default(1)
    @Column({
        type: DataTypes.DECIMAL(6, 1),
        field: 'DepositLimitPeriodInHour',
    })
    depositLimitPeriodInHour: number

    @Default(0)
    @Column({ type: DataTypes.BOOLEAN, field: 'IsAuthenticProfile' })
    isAuthenticProfile: boolean

    @AllowNull(false)
    @Default(0)
    @Column({ type: DataTypes.BOOLEAN, field: 'IsQuickBet' })
    isQuickBet: boolean

    @Column({
        type: DataTypes.DATE,
        field: 'AuthenticProfileDate',
    })
    authenticProfileDate: string

    @DeletedAt
    @Column({ field: 'DeletedDate' })
    deletedDate: Date

    @AllowNull(false)
    @Default(0)
    @Column({ field: 'IsBlocked', type: DataTypes.SMALLINT })
    isBlocked: boolean

    @Column({ field: 'BlockedDate', type: DataTypes.DATE })
    blockedDate: Date

    @AllowNull(false)
    @Default(0)
    @Column({ field: 'CloseAccountType', type: DataTypes.SMALLINT })
    closeAccountType: number

    @Default(0)
    @Column({ type: DataTypes.BOOLEAN, field: 'IsAutoFollow' })
    isAutoFollow: boolean

    static async getProfile(userId: number) {
        const profile = await execProc<UserProfileDTO>(
            UserProfileDTO,
            Sprocs.UserGetProfile,
            {
                replacements: [userId],
                plain: true,
            }
        )
        return profile
    }

    static async getProfileByUUID(userId: number, uuid: string) {
        const profile = await execProc<UserPublicProfileDTO>(
            UserPublicProfileDTO,
            Sprocs.UserGetProfileByUUID,
            {
                replacements: [userId, uuid],
                plain: true,
            }
        )
        return profile
    }
}
