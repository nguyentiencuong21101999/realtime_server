import { Expose, plainToInstance, Transform } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'
import { Request } from 'express'
import { ToBoolean, ToFullUrl } from '../../../helpers/utils'
import User from '../models/user.model'

export class LoginDTO {
    @Expose()
    userName: string

    @Expose()
    password: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    deviceCode: string

    @Expose()
    @IsOptional()
    deviceName?: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    tokenFireBase?: string

    @Expose()
    @IsOptional()
    devicePlatform?: string

    @Expose()
    @IsOptional()
    deviceVersion?: string

    @Expose()
    @IsOptional()
    wolfdenAppVersion?: string

    @Expose()
    clientIp: string

    @Expose()
    userAgent: string

    static fromReq = (req: Request): LoginDTO => {
        return plainToInstance(LoginDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }
}
export class UserDTO {
    @Expose() userId: number
    @Expose({ name: 'uUID' }) uuid: string
    @Expose() title: string
    @Expose() firstName: string
    @Expose() middleName: string
    @Expose() lastName: string
    @Expose() gender: string
    @Expose({ name: 'dOB' }) dob: string
    @Expose() fullName: string
    @Expose() phoneNumber: string
    @Expose() email: string

    @Expose()
    @Transform(ToBoolean)
    isDepositLimit: boolean

    @Expose() depositLimitValue: number
    @Expose() depositLimitPeriodInHour: number
    @Expose() userName: string

    @Expose()
    @Transform(ToFullUrl)
    profileUrl: string

    @Expose()
    @Transform(ToBoolean)
    isPrivateAccount: boolean

    @Expose()
    @Transform(ToBoolean)
    isWolfdenAccount: boolean

    @Expose()
    @Transform(ToBoolean)
    isAutoFollow: boolean

    @Expose()
    @Transform(ToBoolean)
    isTurnOnCopyBet: boolean

    @Expose()
    @Transform(ToBoolean)
    isAuthenticProfile: boolean

    @Expose()
    @Transform(ToBoolean)
    isDeleted: boolean

    @Expose()
    @Transform(ToBoolean)
    isBlocked: boolean

    @Expose()
    followStatus: number

    @Expose()
    @Transform(ToBoolean)
    isQuickBet: boolean

    @Expose()
    closeAccountType: number

    @Expose()
    accessToken: string

    static fromUser = (user: User): UserDTO => {
        const res = plainToInstance(UserDTO, user.get(), {
            excludeExtraneousValues: true,
        })
        return res
    }
    static fromUserWolfdenAccount = (user: User[]) => {
        const res = plainToInstance(UserDTO, user, {
            excludeExtraneousValues: true,
        })
        return res
    }
}

export class UserProfileDTO extends UserDTO {
    @Expose() motto: string
    @Expose() bio: string

    @Expose()
    @Transform(ToFullUrl)
    bannerUrl: string

    @Expose() countryCode: string
    @Expose() residentialAddress: string
    @Expose() stateAddress: string
    @Expose() streetNumber: string
    @Expose() streetName: string
    @Expose() streetType: string
    @Expose() suburbAddress: string
    @Expose() postcode: string

    @Expose() roleId: number

    @Expose() coloUserName: string
}

export class UserPublicProfileDTO {
    @Expose({ name: 'uUID' }) uuid: string

    @Expose() firstName: string
    @Expose() middleName: string
    @Expose() lastName: string
    @Expose() fullName: string
    @Expose() userName: string

    @Expose()
    @Transform(ToFullUrl)
    profileUrl: string

    @Expose()
    @Transform(ToBoolean)
    isPrivateAccount: boolean

    @Expose()
    @Transform(ToBoolean)
    isAuthenticProfile: boolean

    @Expose() motto: string
    @Expose() bio: string

    @Expose()
    @Transform(ToFullUrl)
    bannerUrl: string

    @Expose()
    @Transform(ToBoolean)
    isFollowing: boolean

    @Expose()
    followStatus: boolean

    @Expose()
    @Transform(ToBoolean)
    isFollower: boolean

    @Expose()
    roleId: number

    @Expose()
    @Transform(ToBoolean)
    isUserBlocked: boolean
}

export interface LogoutDTO {
    deviceCode: string
    userId: number
    token: string
}

export class UserVerifyDTO {
    @Expose()
    verifyUserId: number

    @Expose()
    userId: number

    @Expose()
    @IsBoolean()
    isVerify: boolean

    @Expose()
    roleId: number

    static fromReq = (req: Request): UserVerifyDTO => {
        const res = plainToInstance(UserVerifyDTO, req.body, {
            excludeExtraneousValues: true,
        })
        return res
    }
}
