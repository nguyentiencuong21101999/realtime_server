import { validateOrReject } from 'class-validator'
import { NextFunction, Response } from 'express'
import { parseValidationError } from '../../helpers/validator'
import { AuthService } from '../auth/auth.service'
import { BodyRequest } from '../base/base.request'
import { CreateUserDTO } from './dtos/user-create.dto'
import { UpdateUserDTO } from './dtos/user-update.dto'
import { LoginDTO } from './dtos/user.dto'

export class UserMiddleWare {
    authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    tranformAndValidateCreateUserReq = async (
        req: BodyRequest<CreateUserDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.body = CreateUserDTO.fromReq(req)
            if (!req.body.isDepositLimit) {
                req.body.depositLimitValue = 1
                req.body.depositLimitPeriodInHour = 99
            }
            await validateOrReject(req.body)
            next()
        } catch (err) {
            next(parseValidationError(err))
        }
    }

    tranformAndValidateLoginReq = async (
        req: BodyRequest<LoginDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const clientIp = req.header('x-forwarded-for')
            req.body = LoginDTO.fromReq(req)
            req.body.clientIp = clientIp
            req.body.userAgent = req.get('User-Agent')
            await validateOrReject(req.body)
            next()
        } catch (err) {
            next(parseValidationError(err))
        }
    }

    // uploadAvatar = async (
    //     req: BodyRequest<UpdateUserDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     const dir = userAssetDir(req.uuid, StorageDir.Profiles)
    //     const uploadHandler = uploadImage(dir, 'avatar').single('image')
    //     uploadHandler(req, res, (err: unknown) => {
    //         if (err) {
    //             next(err)
    //             return
    //         }
    //         const file = req && req.file && instanceToPlain(req.file)
    //         if (file && file['key']) {
    //             req.body.profileUrl = file['key']
    //         }
    //         next()
    //     })
    // }

    // uploadBanner = async (
    //     req: BodyRequest<UpdateUserDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     const dir = userAssetDir(req.uuid, StorageDir.Profiles)
    //     const uploadHandler = uploadImage(dir, 'banner').single('image')
    //     uploadHandler(req, res, (err: unknown) => {
    //         if (err) {
    //             next(err)
    //             return
    //         }
    //         const file = req.file && instanceToPlain(req.file)
    //         if (file && file['key']) {
    //             req.body.bannerUrl = file['key']
    //         }
    //         next()
    //     })
    // }

    tranformAndValidateUpdateUserReq = async (
        req: BodyRequest<UpdateUserDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.body = UpdateUserDTO.fromReq(req)
            await validateOrReject(req.body)
            next()
        } catch (err) {
            next(parseValidationError(err))
        }
    }
}
