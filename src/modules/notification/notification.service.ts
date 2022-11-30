import { Queue } from 'bullmq'
import { Config } from '../../configs'
import { Errors } from '../../helpers/error'
import {
    NotificationItemQueueName,
    PushNotificationJobData,
} from '../queue/notification-queue.service'
import UserFollow from '../users/models/user-follow.model'
import User from '../users/models/user.model'
import {
    NotiReceiverReadReqDTO,
    NotiReceiverReqDTO,
} from './dtos/noti-receiver.dto'
import { NotiUserBlockDTO } from './dtos/noti-user-block.dto'
import { NotiUserConfigReqDTO } from './dtos/noti-user-config.dto'
import NotiReceiver from './models/noti-receiver.model'
import { NotiTypes } from './models/noti-type.model'
import NotiUserConfig from './models/noti-user-config.model'
import { default as NotiUserSubscribe } from './models/noti-user-subscribe.model'

class NotiSubscribeDTO {
    notiType: NotiTypes
}

const NotiSubscribeData = Array<NotiSubscribeDTO>(
    {
        notiType: NotiTypes.ShareBet,
    },
    {
        notiType: NotiTypes.NewHowl,
    }
)

export class NotificationService {
    config: Config
    notiItemQueue: Queue

    constructor(config: Config, notiItemQueue: Queue) {
        this.config = config
        this.notiItemQueue = notiItemQueue
    }

    addNotificationToQueue = async (data: PushNotificationJobData) => {
        await this.notiItemQueue.add(NotificationItemQueueName, data)
    }

    getListNotification = async (params: NotiReceiverReqDTO) => {
        const notifications = await NotiReceiver.getList(params)
        const pagination = params.pagination
        if (notifications?.length > 0) {
            pagination.total = notifications[0].totalNoti
        } else {
            pagination.total = 0
        }
        return { notifications, pagination }
    }

    readNotification = async (params: NotiReceiverReadReqDTO) => {
        await NotiReceiver.readNotification(params)
    }

    readAllNotification = async (userId: number) => {
        await NotiReceiver.readAllNotification(userId)
    }

    enableConfig = async (params: NotiUserConfigReqDTO) => {
        const res = await NotiUserConfig.enable(params)
        return res
    }

    getConfigs = async (userId: number) => {
        const configs = await NotiUserConfig.getConfigs(userId)
        return configs
    }

    /** block noti of users when they add howl/ copy bet */
    blockNotiUser = async (params: NotiUserBlockDTO) => {
        const blockUser = await User.findOne({
            where: {
                uuid: params.blockedUserUUID,
            },
        })
        if (!blockUser) {
            throw Errors.UserNotFound
        }
        const isBlock = params.isBlock ?? false
        // check user must be following
        const userFollow = await UserFollow.findOne({
            where: {
                userId: blockUser.userId,
                followerUserId: params.userId,
            },
        })
        if (!userFollow) {
            throw Errors.YouAreNotFollowing
        }
        const subscribedUser = await NotiUserSubscribe.findOne({
            where: {
                userId: params.userId,
                subscribedUserUUID: params.blockedUserUUID,
                notiType: params.notiType,
            },
        })
        if (isBlock) {
            if (!subscribedUser) {
                return
            }
            const res = await NotiUserSubscribe.destroy({
                where: {
                    userId: params.userId,
                    subscribedUserUUID: params.blockedUserUUID,
                    notiType: params.notiType,
                },
            })
            if (res === 0) {
                throw Errors.UnblockUserNotiFailed
            }
        } else {
            if (subscribedUser) {
                return
            }
            await NotiUserSubscribe.create({
                ...params,
                subscribedUserUUID: params.blockedUserUUID,
                subscribedUserId: blockUser.userId,
                createdBy: params.userId,
                updatedBy: params.userId,
            })
        }
    }

    checkBlockNotiByUUID = async (userId: number, uuid: string) => {
        const subscribedNotis = await NotiUserSubscribe.findAll({
            where: {
                userId,
                subscribedUserUUID: uuid,
            },
        })
        const subscribedNotiTypes = new Set(
            subscribedNotis.map((i) => i.notiType).filter((i) => i != null)
        )
        return NotiSubscribeData.filter(
            (i) => !subscribedNotiTypes.has(i.notiType)
        )
    }
}
