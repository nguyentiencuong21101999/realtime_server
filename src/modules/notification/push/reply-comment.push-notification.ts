import { Errors } from '../../../helpers/error'
import User from '../../users/models/user.model'
import NotiItem from '../models/noti-item.model'
import { NotiTypes } from '../models/noti-type.model'
import { PushNotification, PushNotificationData } from './push-notification'

export class ReplyCommentPushNotification extends PushNotification {
    createItem = async (): Promise<NotiItem> => {
        const sender = await User.findByPk(this.senderId)
        if (!sender) {
            throw Errors.UserNotFound
        }
        let content = `${sender.userName} replied to your comment`
        if (this.data['ownerCommentUserId']) {
            const ownerCommentUser = await User.findByPk(
                this.data['ownerCommentUserId']
            )
            content = `${sender.userName} replied to ${ownerCommentUser.userName}'s comment on your post`
        }
        const item = await NotiItem.create({
            title: 'Wolfden',
            content,
            notiTypeId: NotiTypes.ReplyComment,
            jsonData: this.data ? JSON.stringify(this.data) : null,
            userOwnerId: this.senderId,
        })
        return item
    }
}

export class ReplyCommentPushNotificationData implements PushNotificationData {
    type: number
    tweetId: number
    tweetCommentId: number
    parentTweetCommentId: number
    ownerCommentUserId?: number
}
