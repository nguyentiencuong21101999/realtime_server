import { Expose, plainToInstance, Transform } from 'class-transformer'
import { Pagination } from '../../../helpers/response.wrapper'
import { AuthRequest } from '../../auth/auth.middleware'
import { UserDTO } from '../../users/dtos/user.dto'

export class NotiReceiverReqDTO {
    userId: number
    pagination: Pagination

    static fromReq = (req: AuthRequest): NotiReceiverReqDTO => {
        return {
            pagination: Pagination.fromReq(req),
            userId: req.userId,
        }
    }
}

export class NotiReceiverReadReqDTO {
    userId: number
    notiReceiverId: string

    static fromReq = (req: AuthRequest): NotiReceiverReadReqDTO => {
        return {
            userId: req.userId,
            notiReceiverId: req.params['notiReceiverId'] as string,
        }
    }
}

export class NotiReceiverDTO {
    @Expose()
    notiReceiverId: number

    @Expose()
    isRead: boolean

    @Expose()
    pagingByUserId: number

    @Expose()
    notiItemId: number

    @Expose()
    title: string

    @Expose()
    content: string

    @Expose()
    jsonData: string

    @Expose()
    totalNoti: number

    @Expose()
    totalUnRead: number

    @Expose()
    createdDate: string

    @Expose()
    updatedDate: string

    @Expose()
    @Transform((params) => {
        return plainToInstance(UserDTO, params.value)
    })
    sender: UserDTO
}
