import { Errors } from '../../../helpers/error'
import User from '../../users/models/user.model'
import NotiItem from '../models/noti-item.model'
import { NotiTypes } from '../models/noti-type.model'
import { PushNotification, PushNotificationData } from './push-notification'

export class LikePushNotification extends PushNotification {
    createItem = async () => {
        const sender = await User.findByPk(this.senderId)
        if (!sender) {
            throw Errors.UserNotFound
        }
        const item = await NotiItem.create({
            title: 'Wolfden',
            content: `${sender.userName} liked your howl`,
            notiTypeId: NotiTypes.Like,
            userOwnerId: this.senderId,
            jsonData: this.data ? JSON.stringify(this.data) : null,
        })
        return item
    }
}

export class LikePushNotificationData implements PushNotificationData {
    type: number
    tweetId: number
}
