import express from 'express'
import { authMiddleware, notificationService } from '../../services'
import { NotificationController } from './notification.controller'
import { NotificationMiddleware } from './notification.middleware'

export const notificationRouter = express.Router()

const notificationMiddleware = new NotificationMiddleware()
const notificationController = new NotificationController(notificationService)

notificationRouter.get(
    '',
    authMiddleware.authorization,
    notificationController.getListNotification
)

notificationRouter.put(
    '/configs',
    authMiddleware.authorization,
    notificationController.enableConfig
)

notificationRouter.get(
    '/configs',
    authMiddleware.authorization,
    notificationController.getConfigs
)

notificationRouter.put(
    '/all',
    authMiddleware.authorization,
    notificationController.readAllNotification
)

notificationRouter.put(
    '/:notiReceiverId',
    authMiddleware.authorization,
    notificationController.readNotification
)

notificationRouter.post(
    '/block',
    authMiddleware.authorization,
    notificationMiddleware.tranformAndValidateNotiUserBlockReq,
    notificationController.blockNotiUser
)

notificationRouter.get(
    '/block/:uuid',
    authMiddleware.authorization,
    notificationController.checkBlockNotiByUUID
)
