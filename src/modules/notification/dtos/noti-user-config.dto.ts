import { Expose, plainToInstance } from 'class-transformer'
import { AuthRequest } from '../../auth/auth.middleware'

export class NotiUserConfigReqDTO {
    @Expose()
    userId: number

    @Expose()
    notiTypeId: number

    @Expose()
    isTurnOnNoti: boolean

    static fromReq = (req: AuthRequest) => {
        return plainToInstance(NotiUserConfigReqDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }
}
