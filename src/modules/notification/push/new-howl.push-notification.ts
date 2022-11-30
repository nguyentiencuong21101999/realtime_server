import { Errors } from '../../../helpers/error'
import UserFollow from '../../users/models/user-follow.model'
import User from '../../users/models/user.model'
import NotiItem from '../models/noti-item.model'
import { NotiTypes } from '../models/noti-type.model'
import { PushNotification, PushNotificationData } from './push-notification'

export class NewHowlPushNotification extends PushNotification {
    createItem = async (): Promise<NotiItem> => {
        const sender = await User.findByPk(this.senderId)
        if (!sender) {
            throw Errors.UserNotFound
        }
        const item = await NotiItem.create({
            title: 'Wolfden',
            content: `${sender.userName} added a new howl`,
            notiTypeId: NotiTypes.NewHowl,
            jsonData: this.data ? JSON.stringify(this.data) : null,
            userOwnerId: this.senderId,
        })
        return item
    }

    getReceivers = async (): Promise<number[]> => {
        const followers = await UserFollow.findAll({
            where: { userId: this.senderId, userFollowStatus: 10 },
        })
        return followers?.map((f) => f.followerUserId) ?? []
    }
}

export class NewHowlPushNotificationData implements PushNotificationData {
    type: number
    tweetId: number
}
