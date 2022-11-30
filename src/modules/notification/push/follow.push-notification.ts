import { Errors } from '../../../helpers/error'
import User from '../../users/models/user.model'
import NotiItem from '../models/noti-item.model'
import { NotiTypes } from '../models/noti-type.model'
import { PushNotification, PushNotificationData } from './push-notification'

export class FollowPushNotification extends PushNotification {
    createItem = async (): Promise<NotiItem> => {
        const sender = await User.findByPk(this.senderId)
        if (!sender) {
            throw Errors.UserNotFound
        }
        const item = await NotiItem.create({
            title: 'Wolfden',
            content: `${sender.userName} just followed you`,
            notiTypeId: NotiTypes.Follow,
            userOwnerId: this.senderId,
            jsonData: this.data ? JSON.stringify(this.data) : null,
        })
        return item
    }
}

export class FollowPushNotificationData implements PushNotificationData {
    type: number
    userUUID: string
    isAccepted?: boolean
}
