import express from 'express'
import { authMiddleware, authService, userService } from '../../services'
import { UserController } from './user.controller'
import { UserMiddleWare } from './user.middleware'

const userController = new UserController(userService)
const userMiddleware = new UserMiddleWare(authService)

export const userRouter = express.Router()

userRouter.post(
    '/sign-up',
    userMiddleware.tranformAndValidateCreateUserReq,
    userController.signUp
)
userRouter.post(
    '/sign-in',
    userMiddleware.tranformAndValidateLoginReq,
    userController.signIn
)

userRouter.post(
    '/sign-out',
    authMiddleware.authorization,
    userController.signOut
)
