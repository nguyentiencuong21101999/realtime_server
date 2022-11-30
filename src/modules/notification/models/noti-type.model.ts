import { DataTypes } from 'sequelize'
import {
    AllowNull,
    Column,
    Default,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'

@Table({ tableName: 'NotiType' })
export default class NotiType extends BaseModel<NotiType> {
    @PrimaryKey
    @Column({ field: 'NotiTypeId', type: DataTypes.SMALLINT })
    notiTypeId: number

    @AllowNull(false)
    @Column({ field: 'NotiTypeName', type: DataTypes.STRING(255) })
    notiTypeName: string

    @Default(1)
    @Column({ field: 'IsAutoTurnOn', type: DataTypes.TINYINT({ length: 1 }) })
    isAutoTurnOn: number

    @AllowNull(false)
    @Default(1)
    @Column({ field: 'IsActive', type: DataTypes.SMALLINT })
    isActive: number
}

export enum NotiTypes {
    Like = 1,
    Rehowl = 2,
    Share = 3,
    Follow = 4,
    Comments = 5,
    LikeComment = 6,
    ReplyComment = 7,
    FollowingRequest = 8,
    Mentions = 9,
    ShareBet = 10,
    CopyBet = 11,
    NewHowl = 12,
}
