import { Errors } from '../../../helpers/error'
import User from '../../users/models/user.model'
import NotiItem from '../models/noti-item.model'
import { NotiTypes } from '../models/noti-type.model'
import { PushNotification, PushNotificationData } from './push-notification'

export class LikeCommentPushNotification extends PushNotification {
    createItem = async (): Promise<NotiItem> => {
        const sender = await User.findByPk(this.senderId)
        if (!sender) {
            throw Errors.UserNotFound
        }
        const item = await NotiItem.create({
            title: 'Wolfden',
            content: `${sender.userName} liked your comment`,
            notiTypeId: NotiTypes.LikeComment,
            jsonData: this.data ? JSON.stringify(this.data) : null,
            userOwnerId: this.senderId,
        })
        return item
    }
}

export class LikeCommentPushNotificationData implements PushNotificationData {
    type: number
    tweetId: number
    tweetCommentId?: number
}
