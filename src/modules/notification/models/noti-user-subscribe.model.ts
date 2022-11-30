import { DataTypes } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    Column,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'

@Table({
    tableName: 'NotiUserSubscribe',
    indexes: [
        {
            name: 'idx_userId_subscribedUserUUID',
            fields: [
                'UserId',
                'SubscribedUserUUID',
                'SubscribedUserId',
                'NotiType',
            ],
            unique: true,
        },
    ],
})
export default class NotiUserSubscribe extends BaseModel<NotiUserSubscribe> {
    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'NotiUserSubscribeId', type: DataTypes.INTEGER })
    notiUserSubscribeId: number

    @AllowNull(false)
    @Column({ field: 'UserId', type: DataTypes.INTEGER })
    userId: number

    @AllowNull(false)
    @Column({ field: 'SubscribedUserUUID', type: DataTypes.STRING })
    subscribedUserUUID: string

    @AllowNull(false)
    @Column({ field: 'SubscribedUserId', type: DataTypes.INTEGER })
    subscribedUserId: number

    @AllowNull(false)
    @Column({ field: 'NotiType', type: DataTypes.SMALLINT })
    notiType: number
}
