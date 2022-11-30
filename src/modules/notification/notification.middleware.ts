import { validateOrReject } from 'class-validator'
import { NextFunction, Response } from 'express'
import { parseValidationError } from '../../helpers/validator'
import { BodyRequest } from '../base/base.request'
import { NotiUserBlockDTO } from './dtos/noti-user-block.dto'

export class NotificationMiddleware {
    tranformAndValidateNotiUserBlockReq = async (
        req: BodyRequest<NotiUserBlockDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.body = NotiUserBlockDTO.fromReq(req)
            req.body.userId = req.userId
            await validateOrReject(req.body)
            next()
        } catch (err) {
            next(parseValidationError(err))
        }
    }
}
