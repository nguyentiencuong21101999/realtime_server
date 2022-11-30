import sequelize, { DataTypes } from 'sequelize'
import {
    AllowNull,
    Column,
    CreatedAt,
    Default,
    Table,
    UpdatedAt,
    Model,
} from 'sequelize-typescript'

@Table({ tableName: 'StatsUserNoti' })
export default class StatsUserNoti extends Model<StatsUserNoti> {
    @AllowNull(false)
    @Column({ field: 'UserId', type: DataTypes.INTEGER })
    userId: number

    @AllowNull(false)
    @Default(0)
    @Column({ field: 'NotiTypeId', type: DataTypes.INTEGER })
    notiTypeId: number

    @AllowNull(false)
    @Default(0)
    @Column({ field: 'TotalUnRead', type: DataTypes.INTEGER })
    totalUnRead: number

    @AllowNull(false)
    @Default(0)
    @Column({ field: 'TotalRead', type: DataTypes.INTEGER })
    totalRead: number

    @CreatedAt
    @Default(sequelize.literal('CURRENT_TIMESTAMP'))
    @Column({ field: 'CreatedDate' })
    createdDate: Date

    @UpdatedAt
    @Default(sequelize.literal('CURRENT_TIMESTAMP'))
    @Column({ field: 'UpdatedDate' })
    updatedDate: Date
}
