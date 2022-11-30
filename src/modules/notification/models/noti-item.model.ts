import { DataTypes } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    BeforeCreate,
    Column,
    Default,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'

@Table({ tableName: 'NotiItem' })
export default class NotiItem extends BaseModel<NotiItem> {
    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'NotiItemId', type: DataTypes.BIGINT })
    notiItemId: number

    @AllowNull(false)
    @Column({ field: 'Title', type: DataTypes.STRING(255) })
    title: string

    @AllowNull(false)
    @Column({ field: 'Content', type: DataTypes.STRING(4000) })
    content: string

    @AllowNull(false)
    @Default(1)
    @Column({ field: 'NotiTypeId', type: DataTypes.SMALLINT })
    notiTypeId: number

    @Column({ field: 'UserOwnerId', type: DataTypes.INTEGER })
    userOwnerId: number

    @Column({ field: 'ObjectSourceType', type: DataTypes.STRING(32) })
    objectSourceType: string

    @Column({ field: 'ObjectSourceId', type: DataTypes.BIGINT })
    objectSourceId: number

    @Column({ field: 'JsonData', type: DataTypes.STRING(4000) })
    jsonData: string

    @BeforeCreate
    static beforeCreateHook = (noti: NotiItem) => {
        noti.createdBy = noti.userOwnerId
        noti.updatedBy = noti.userOwnerId
    }
}
