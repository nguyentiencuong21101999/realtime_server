import { PushNotificationJobData } from '../../queue/notification-queue.service'
import { PushNotificationDTO } from '../dtos/notification.dto'
import NotiItem from '../models/noti-item.model'
import NotiReceiver from '../models/noti-receiver.model'
import { NotiTypes } from '../models/noti-type.model'
import NotiUserConfig from '../models/noti-user-config.model'
import NotiUserSubscribe from '../models/noti-user-subscribe.model'

export interface PushNotificationData {
    type: number
}

export abstract class PushNotification {
    senderId: number
    receiverIds?: number[]
    item?: NotiItem
    data?: PushNotificationData

    constructor(data: PushNotificationJobData) {
        this.senderId = data.senderId
        this.receiverIds = data.receiverIds
        this.item = data.item
        this.data = data.data
    }

    createItem: () => Promise<NotiItem>

    getReceivers = async () => {
        return this.receiverIds ?? []
    }

    createReceivers = async (receiverIds: number[]) => {
        const subscribedUsers = await this.getListSubscribedUsers()
        const jobs = await Promise.all(
            receiverIds.map(async (id) => {
                if (id != this.item.userOwnerId) {
                    let isTurnOnNoti = false
                    const notiType = this.data?.type
                    if (
                        notiType !== NotiTypes.ShareBet &&
                        notiType !== NotiTypes.NewHowl
                    ) {
                        const config = await NotiUserConfig.getConfig(
                            id,
                            this.data?.type
                        )
                        isTurnOnNoti = config?.isTurnOnNoti !== 0
                    } else {
                        isTurnOnNoti = subscribedUsers.has(id)
                    }
                    if (isTurnOnNoti) {
                        const receiver = {
                            userId: id,
                            notiTypeId: this.item.notiTypeId,
                            notiItemId: this.item.notiItemId,
                            userOwnerId: this.item.userOwnerId,
                        }
                        return receiver
                    }
                }
            })
        )

        const data = jobs.filter((i) => i != null)
        if (data.length > 0) {
            return await NotiReceiver.bulkCreate(data)
        }
        return []
    }

    payload = (tokens: string[]): PushNotificationDTO => {
        return {
            title: this.item.title,
            body: this.item.content,
            tokens,
            data: this.data,
        }
    }

    getListSubscribedUsers = async () => {
        const notiType = this.data?.type
        if (notiType === NotiTypes.ShareBet || notiType === NotiTypes.NewHowl) {
            const susbribedUsers = await NotiUserSubscribe.findAll({
                where: {
                    subscribedUserId: this.senderId,
                },
            })
            return new Set(
                susbribedUsers
                    .map((sub) => {
                        if (sub.notiType === notiType) {
                            return sub.userId
                        }
                    })
                    .filter((i) => i != null)
            )
        }
        return new Set([])
    }
}
