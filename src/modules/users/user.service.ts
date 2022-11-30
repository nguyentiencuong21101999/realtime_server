import bcrypt from 'bcrypt'
import { Config } from '../../configs'
import { database } from '../../database/connection'
import { Errors } from '../../helpers/error'
import { genFullName } from '../../helpers/utils'
import { AuthService } from '../auth/auth.service'
import { CreateUserDTO } from './dtos/user-create.dto'
import { UserRoleDTO } from './dtos/user-role.dto'
import { LoginDTO, LogoutDTO } from './dtos/user.dto'
import UserRole, { UserRoleEnum } from './models/user-role.model'
import User from './models/user.model'

export class UserService {
    authService: AuthService
    conf: Config

    constructor(conf: Config, authService: AuthService) {
        this.conf = conf
        this.authService = authService
    }

    signUp = async (params: CreateUserDTO) => {
        // validate user info
        await this.validateUserRegistrationInfo(params)
        let newUserId: number
        let roleId: number
        let refUserId: number

        await database.transaction(async (transaction) => {
            //if refCode => referral
            if (params.refCode) {
                refUserId = await this.userReferral(params.refCode, true)
            }
            // create wolfden user
            params.fullName = genFullName(
                params.firstName,
                params.middleName,
                params.lastName
            )
            params.password = await bcrypt.hash(params.password, 10)
            const user = await User.create(
                { ...params, refUserId: refUserId },
                { transaction }
            )
            newUserId = user.userId

            //create user role
            const userRoleDTO: UserRoleDTO = {
                userId: newUserId,
                roleId: UserRoleEnum.User,
            }
            const userRole = await UserRole.create(userRoleDTO)
            roleId = userRole.roleId
            // create wolfden user advance info
            const userAdvance = CreateUserDTO.toUserAdvance(params)
            userAdvance.userId = user.userId
            await userAdvance.save({ transaction })
        })

        const user = await User.findOne({ where: { userId: newUserId } })
        const token = await this.authService.signToken(
            user.userId,
            user.uuid,
            roleId
        )

        const profile = await User.getProfile(user.userId)
        profile.accessToken = token

        return profile
    }

    signIn = async (params: LoginDTO) => {
        const user = await User.findOne({
            where: { userName: params.userName },
        })
        if (user == null) {
            throw Errors.InvalidAccount
        }

        const isValidPassword = bcrypt.compareSync(
            params.password,
            user.password
        )

        if (!isValidPassword) {
            //throw err : login
            throw Errors.InvalidAccount
        }

        const userRole = await UserRole.findOne({
            where: { userId: user.userId },
        })
        const token = await this.authService.signToken(
            user.userId,
            user.uuid,
            userRole.roleId
        )

        const profile = await User.getProfile(user.userId)
        profile.accessToken = token

        return profile
    }

    signOut = async (params: LogoutDTO) => {
        await this.authService.removeAccessToken(params.userId, params.token)
    }

    userReferral = async (uuid: string, isFinished: boolean) => {
        const user = await User.findOne({
            where: {
                uuid: uuid,
                isBlocked: 0,
            },
        })

        if (!user || user?.isBlocked) {
            throw Errors.RefCodeNotFound
        }

        if (isFinished) {
            return user.userId
        }
    }

    validateUserRegistrationInfo = async (params: CreateUserDTO) => {
        if (params.userName) {
            const existedUsername = await User.findOne({
                where: { userName: params.userName },
                paranoid: false,
            })
            if (existedUsername) {
                throw Errors.AlreadyHaveWolfdenAccount
            }
        }

        if (params.email) {
            const existedEmail = await User.findOne({
                where: { email: params.email },
                paranoid: false,
            })
            if (existedEmail) {
                throw Errors.ExistedEmail
            }
        }

        if (params.phoneNumber) {
            const existedPhoneNumber = await User.findOne({
                where: { phoneNumber: params.phoneNumber },
                paranoid: false,
            })
            if (existedPhoneNumber) {
                throw Errors.ExistedPhoneNumber
            }
        }
    }
}
