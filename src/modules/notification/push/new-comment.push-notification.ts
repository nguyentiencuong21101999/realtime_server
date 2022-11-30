import { Errors } from '../../../helpers/error'
import User from '../../users/models/user.model'
import NotiItem from '../models/noti-item.model'
import { NotiTypes } from '../models/noti-type.model'
import { PushNotification, PushNotificationData } from './push-notification'

export class NewCommentPushNotification extends PushNotification {
    createItem = async (): Promise<NotiItem> => {
        const sender = await User.findByPk(this.senderId)
        if (!sender) {
            throw Errors.UserNotFound
        }
        const item = await NotiItem.create({
            title: 'Wolfden',
            content: `${sender.userName} commented on your post`,
            notiTypeId: NotiTypes.Comments,
            jsonData: this.data ? JSON.stringify(this.data) : null,
            userOwnerId: this.senderId,
        })
        return item
    }
}

export class NewCommentPushNotificationData implements PushNotificationData {
    type: number
    tweetId: number
    tweetCommentId: number
}
