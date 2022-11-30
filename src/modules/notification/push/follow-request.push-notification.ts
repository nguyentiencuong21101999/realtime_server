import { Errors } from '../../../helpers/error'
import User from '../../users/models/user.model'
import NotiItem from '../models/noti-item.model'
import { NotiTypes } from '../models/noti-type.model'
import { PushNotification } from './push-notification'

export class FollowRequestPushNotification extends PushNotification {
    createItem = async (): Promise<NotiItem> => {
        const sender = await User.findByPk(this.senderId)
        if (!sender) {
            throw Errors.UserNotFound
        }
        let content = `${sender.userName} sent a follow request`
        if (this.data['isAccepted']) {
            content = `${sender.userName} accepted your follow request`
        }
        const item = await NotiItem.create({
            title: 'Wolfden',
            content: content,
            notiTypeId: NotiTypes.FollowingRequest,
            userOwnerId: this.senderId,
            jsonData: this.data ? JSON.stringify(this.data) : null,
        })
        return item
    }
}
