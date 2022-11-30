import { NextFunction, Response } from 'express'
import { ResponseWrapper } from '../../helpers/response.wrapper'
import { AuthRequest } from '../auth/auth.middleware'
import { BodyRequest } from '../base/base.request'
import {
    NotiReceiverReadReqDTO,
    NotiReceiverReqDTO,
} from './dtos/noti-receiver.dto'
import { NotiUserBlockDTO } from './dtos/noti-user-block.dto'
import { NotiUserConfigReqDTO } from './dtos/noti-user-config.dto'
import { NotificationService } from './notification.service'

export class NotificationController {
    notificationService: NotificationService

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService
    }

    getListNotification = async (
        req: BodyRequest<NotiReceiverReqDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const params = NotiReceiverReqDTO.fromReq(req)
            const { notifications, pagination } =
                await this.notificationService.getListNotification(params)
            res.send(new ResponseWrapper(notifications, null, pagination))
        } catch (err) {
            next(err)
        }
    }

    readNotification = async (
        req: BodyRequest<NotiReceiverReadReqDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const params = NotiReceiverReadReqDTO.fromReq(req)
            await this.notificationService.readNotification(params)
            res.send(new ResponseWrapper(true))
        } catch (err) {
            next(err)
        }
    }

    readAllNotification = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this.notificationService.readAllNotification(req.userId)
            res.send(new ResponseWrapper(true))
        } catch (err) {
            next(err)
        }
    }

    enableConfig = async (
        req: BodyRequest<NotiUserConfigReqDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const params = NotiUserConfigReqDTO.fromReq(req)
            params.userId = req.userId
            await this.notificationService.enableConfig(params)
            res.send(new ResponseWrapper(true))
        } catch (err) {
            next(err)
        }
    }

    getConfigs = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const configs = await this.notificationService.getConfigs(
                req.userId
            )
            res.send(new ResponseWrapper(configs))
        } catch (err) {
            next(err)
        }
    }

    blockNotiUser = async (
        req: BodyRequest<NotiUserBlockDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this.notificationService.blockNotiUser(req.body)
            res.send(new ResponseWrapper(true))
        } catch (err) {
            next(err)
        }
    }

    checkBlockNotiByUUID = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const uuid = (req.params['uuid'] ?? '') as string
            const blocks = await this.notificationService.checkBlockNotiByUUID(
                req.userId,
                uuid
            )
            res.send(new ResponseWrapper(blocks))
        } catch (err) {
            next(err)
        }
    }
}
