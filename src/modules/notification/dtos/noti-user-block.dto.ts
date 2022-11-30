import { Expose, plainToInstance } from 'class-transformer'
import { IsBoolean, IsIn, IsNotEmpty } from 'class-validator'
import { AuthRequest } from '../../auth/auth.middleware'
import { NotiTypes } from '../models/noti-type.model'

export class NotiUserBlockDTO {
    @Expose()
    userId: number

    @Expose()
    @IsNotEmpty()
    blockedUserUUID: string

    blockedUserId: number

    @Expose()
    @IsIn([NotiTypes.ShareBet, NotiTypes.NewHowl])
    notiType: NotiTypes

    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    isBlock: boolean

    static fromReq = (req: AuthRequest) => {
        return plainToInstance(NotiUserBlockDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }
}
