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
import { execProc } from '../../../database/connection'
import { Sprocs } from '../../../database/sprocs'
import { Errors } from '../../../helpers/error'
import { BaseModel } from '../../base/base.enity'
import {
    NotiReceiverDTO,
    NotiReceiverReadReqDTO,
    NotiReceiverReqDTO,
} from '../dtos/noti-receiver.dto'

@Table({ tableName: 'NotiReceiver' })
export default class NotiReceiver extends BaseModel<NotiReceiver> {
    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'NotiReceiverId', type: DataTypes.BIGINT })
    notiReceiverId: number

    @AllowNull(false)
    @Column({ field: 'UserId', type: DataTypes.INTEGER })
    userId: number

    @AllowNull(false)
    @Default(1)
    @Column({ field: 'NotiTypeId', type: DataTypes.SMALLINT })
    notiTypeId: number

    @AllowNull(false)
    @Column({ field: 'NotiItemId', type: DataTypes.INTEGER })
    notiItemId: number

    @AllowNull(false)
    @Default(0)
    @Column({ field: 'IsRead', type: DataTypes.SMALLINT })
    isRead: number

    @Column({ field: 'ReadDate' })
    readDate: Date

    @Column({ field: 'UserOwnerId', type: DataTypes.INTEGER })
    userOwnerId: number

    @AllowNull(false)
    @Default(0)
    @Column({ field: 'IsDeleted', type: DataTypes.SMALLINT })
    isDeleted: number

    @Column({ field: 'DeletedDate' })
    deletedDate: Date

    @AllowNull(false)
    @Default(999999)
    @Column({ field: 'PagingByUserId', type: DataTypes.INTEGER })
    pagingByUserId: number

    @BeforeCreate
    static beforeCreateHook = (noti: NotiReceiver) => {
        noti.createdBy = noti.userOwnerId
        noti.updatedBy = noti.userOwnerId
    }

    static getList = async (params: NotiReceiverReqDTO) => {
        const notifications = await execProc<NotiReceiverDTO[]>(
            NotiReceiverDTO,
            Sprocs.NotificationGetListByUserId,
            {
                replacements: [
                    params.userId,
                    params.pagination.limit,
                    params.pagination.getOffset(),
                ],
            }
        )
        return notifications
    }

    static readNotification = async (params: NotiReceiverReadReqDTO) => {
        const res = await NotiReceiver.update(
            {
                isRead: 1,
                readDate: new Date(),
            },
            {
                where: {
                    userId: params.userId,
                    notiReceiverId: params.notiReceiverId,
                },
            }
        )
        if (res.length > 0 && res[0] > 0) {
            return
        }
        throw Errors.NotificationReadFailed
    }

    static readAllNotification = async (userId: number) => {
        const res = await NotiReceiver.update(
            {
                isRead: 1,
                readDate: new Date(),
            },
            {
                where: {
                    userId: userId,
                    isRead: 0,
                },
            }
        )
        if (res.length > 0 && res[0] > 0) {
            return
        }
        throw Errors.NotificationReadFailed
    }
}
