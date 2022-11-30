import { DataTypes } from 'sequelize'
import {
    AllowNull,
    Column,
    Default,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'
@Table({ tableName: 'UserAdvance' })
export default class UserAdvance extends BaseModel<UserAdvance> {
    @PrimaryKey
    @Column({ field: 'UserId' })
    userId: number

    @AllowNull
    @Column({ type: DataTypes.STRING(512), field: 'Motto' })
    motto: string

    @AllowNull
    @Column({ type: DataTypes.STRING(512), field: 'Bio' })
    bio: string

    @AllowNull
    @Column({ type: DataTypes.STRING(128), field: 'BannerUrl' })
    bannerUrl: string

    @AllowNull
    @Default('AU')
    @Column({ type: DataTypes.STRING(5), field: 'CountryCode' })
    countryCode: string

    @Column({ type: DataTypes.STRING(256), field: 'ResidentialAddress' })
    residentialAddress: string

    @Column({ type: DataTypes.STRING(128), field: 'ColoUserName' })
    coloUserName: string

    @Column({ type: DataTypes.STRING(128), field: 'ColoPassword' })
    coloPassword: string

    @Column({ type: DataTypes.STRING(255), field: 'ColoToken' })
    coloToken: string

    @AllowNull
    @Column({ type: DataTypes.STRING(128), field: 'StateAddress' })
    stateAddress: string

    @AllowNull
    @Column({ type: DataTypes.STRING(10), field: 'StreetNumber' })
    streetNumber: string

    @AllowNull
    @Column({ type: DataTypes.STRING(255), field: 'StreetName' })
    streetName: string

    @AllowNull
    @Column({ type: DataTypes.STRING(10), field: 'StreetType' })
    streetType: string

    @AllowNull
    @Column({ type: DataTypes.STRING(128), field: 'SuburbAddress' })
    suburbAddress: string

    @AllowNull
    @Column({ type: DataTypes.STRING(10), field: 'Postcode' })
    postcode: string

    @AllowNull
    @Column({ type: DataTypes.BIGINT, field: 'LastUserLoginTrackingId' })
    lastUserLoginTrackingId: number
}
