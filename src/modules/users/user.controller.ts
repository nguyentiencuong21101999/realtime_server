import { NextFunction, Response } from 'express'
import { ResponseWrapper } from '../../helpers/response.wrapper'
import { AuthRequest } from '../auth/auth.middleware'
import { BodyRequest } from '../base/base.request'
import { CreateUserDTO } from './dtos/user-create.dto'
import { LoginDTO, LogoutDTO } from './dtos/user.dto'
import { UserService } from './user.service'
export interface GetListUSerFollowRequest extends AuthRequest {
    userId: number
    follow?: string
}

export class UserController {
    userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    signUp = async (
        req: BodyRequest<CreateUserDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.signUp(req.body)
            res.send(new ResponseWrapper(user, null, null))
        } catch (err) {
            next(err)
        }
    }

    signIn = async (
        req: BodyRequest<LoginDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.userService.signIn(req.body)
            res.send(new ResponseWrapper(user, null, null))
        } catch (err) {
            next(err)
        }
    }

    signOut = async (
        req: BodyRequest<LogoutDTO>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const authHeader = req.headers['authorization']
            const [, token] = authHeader && authHeader.split(' ')
            const params = req.body
            params.userId = req.userId
            params.token = token
            await this.userService.signOut(params)
            res.send(new ResponseWrapper(true, null, null))
        } catch (err) {
            next(err)
        }
    }

    // getProfile = async (
    //     req: AuthRequest,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const profile = await this.userService.getProfile(req.userId)
    //         res.send(new ResponseWrapper(profile, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // updateUserAdvance = async (
    //     req: BodyRequest<UpdateUserDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const params = UpdateUserDTO.fromReq(req)
    //         await this.userService.updateUser(req.userId, params)
    //         const profile = await this.userService.updateUserAdvance(
    //             req.userId,
    //             params
    //         )
    //         await this.userService.addKeywordUserTracking(
    //             profile.userId,
    //             KeywordScoreUserNames.Update
    //         )
    //         res.send(new ResponseWrapper(profile, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // updateUser = async (
    //     req: BodyRequest<UpdateUserDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const profile = await this.userService.updateUser(
    //             req.userId,
    //             UpdateUserDTO.fromReq(req)
    //         )
    //         res.send(new ResponseWrapper(profile, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // changePassword = async (
    //     req: BodyRequest<UserChangePasswordDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const token = await this.userService.changePassword(
    //             req.userId,
    //             req.roleId,
    //             UserChangePasswordDTO.fromReq(req)
    //         )
    //         res.send(new ResponseWrapper(token, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // requestResetPassword = async (
    //     req: BodyRequest<UserRequestResetPasswordDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         await this.userService.requestResetPassword(req.body)
    //         res.send(new ResponseWrapper(true, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // resetPassword = async (
    //     req: BodyRequest<UserResetPasswordDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         await this.userService.resetPassword(req.body)
    //         res.send(new ResponseWrapper(true, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // addPushNotification = async (
    //     req: BodyRequest<PushNotificationRequestDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const params = req.body
    //         params.userId = req.userId
    //         await this.userService.addPushNotification(params)
    //         res.send(new ResponseWrapper(true, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }
    // removePushNotification = async (
    //     req: BodyRequest<PushNotificationRequestDTO>,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const params = req.body
    //         params.userId = req.userId
    //         await this.userService.removePushNotification(params)
    //         res.send(new ResponseWrapper(true, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // getProfileByUUID = async (
    //     req: AuthRequest,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const profile = await this.userService.getProfileByUUID(
    //             req.userId,
    //             req.params.uuid
    //         )
    //         res.send(new ResponseWrapper(profile, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    // userReferral = async (
    //     req: AuthRequest,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         await this.userService.userReferral(req.params.uuid, false)
    //         res.send(new ResponseWrapper(true, null, null))
    //     } catch (err) {
    //         next(err)
    //     }
    // }
}
