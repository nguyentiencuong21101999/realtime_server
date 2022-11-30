import { Expose, plainToInstance, Transform } from 'class-transformer'
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Length,
    Matches,
} from 'class-validator'
import { Request } from 'express'
import { ToTrim } from '../../../helpers/utils'

export class UpdateUserDTO {
    @Expose()
    @Length(0, 32)
    @IsOptional()
    @Transform(ToTrim)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    firstName: string

    @Expose()
    @Length(0, 32)
    @IsOptional()
    @Transform(ToTrim)
    @Matches(new RegExp("(^$)|(^[a-zA-Z][a-zA-Z '-]*$)"))
    middleName: string

    @Expose()
    @Length(0, 32)
    @IsOptional()
    @Transform(ToTrim)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    lastName: string

    @Expose()
    @IsOptional()
    fullName: string

    @Expose()
    @IsOptional()
    profileUrl: string

    @Expose()
    @IsOptional()
    bannerUrl: string

    @Length(0, 50)
    @IsOptional()
    @Expose()
    motto: string

    @Length(0, 280)
    @IsOptional()
    @Expose()
    bio: string

    @Expose()
    @IsBoolean()
    @IsOptional()
    isPrivateAccount: boolean

    @Expose()
    @IsOptional()
    residentialAddress: string

    @Expose()
    @IsOptional()
    @Matches(new RegExp('^[a-zA-Z0-9 ]+$'))
    stateAddress: string

    @Expose()
    @IsOptional()
    @Matches(new RegExp('^[a-zA-Z0-9 ]+$'))
    streetType: string

    @Expose()
    @IsOptional()
    @Matches(new RegExp('^[0-9][a-zA-Z0-9]*$'))
    streetNumber: string

    @Expose()
    @IsOptional()
    @Matches(new RegExp('^[a-zA-Z0-9 ]+$'))
    streetName: string

    @Expose()
    @IsOptional()
    @Matches(new RegExp('^[a-zA-Z -]+$'))
    suburbAddress: string

    @Expose()
    @IsOptional()
    @IsIn(['AU'])
    countryCode: string

    @Expose()
    @IsOptional()
    @Matches(new RegExp('^[0-9]{4,4}$'))
    postcode: string

    @Expose()
    @IsDateString()
    @IsOptional()
    dob: string

    @Expose()
    @IsOptional()
    @IsIn(['Mr', 'Ms'])
    title: string

    @Expose()
    @IsOptional()
    @IsIn(['M', 'F'])
    gender: string

    @Expose()
    @IsOptional()
    @IsBoolean()
    isWolfdenAccount: boolean

    @Expose()
    @IsOptional()
    @IsBoolean()
    isAutoFollow: boolean

    @Expose()
    @IsOptional()
    @IsBoolean()
    isQuickBet: boolean

    static fromReq = (req: Request) => {
        return plainToInstance(UpdateUserDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }
}

export class UpdateUserAdminDTO extends UpdateUserDTO {
    @Expose()
    @Matches(
        new RegExp(
            '^(?=[a-zA-Z0-9\\.@_-]{6,48})([a-zA-Z0-9]([.@_-]?[a-zA-Z0-9])*)$'
        )
    )
    @IsOptional()
    userName: string

    @Expose()
    @IsEmail()
    @IsOptional()
    email: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    coloUserName: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    coloPassword: string
    @Expose()
    @Matches(
        new RegExp(
            '^(?:\\+?(61))? ?(?:\\((?=.*\\)))?(0?[2-57-8])\\)? ?(\\d\\d(?:[- ](?=\\d{3})|(?!\\d\\d[- ]?\\d[- ]))\\d\\d[- ]?\\d[- ]?\\d{3})$'
        )
    )
    @IsOptional()
    phoneNumber: string

    @Expose()
    @IsNumber()
    userId: number

    @Expose()
    @IsIn([2, 3, 4])
    @IsOptional()
    roleId: number

    static fromReq = (req: Request) => {
        return plainToInstance(UpdateUserAdminDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }

    // static fromParamsReq = (req: Request) => {
    //     req.body.userId = Number(req.params.userId)
    //     return plainToInstance(UpdateUserAdminDTO, req.body, {
    //         excludeExtraneousValues: true,
    //     })
    // }

    // static toUserSuperAdminUpdate = (dto: UpdateUserAdminDTO) => {
    //     return plainToInstance(UpdateUserAdminDTO, dto, {
    //         excludeExtraneousValues: true,
    //     })
    // }

    // static toUserAdminUpdate = (dto: UpdateUserAdminDTO) => {
    //     return plainToInstance(UpdateUserDTO, dto, {
    //         excludeExtraneousValues: true,
    //     })
    // }
}
