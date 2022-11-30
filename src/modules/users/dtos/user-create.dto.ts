import { Expose, plainToInstance, Transform } from 'class-transformer'
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsIn,
    IsIP,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Length,
    Matches
} from 'class-validator'
import { Request } from 'express'
import { ToTrim } from '../../../helpers/utils'
import UserAdvance from '../models/user-advance.model'

export class CreateUserDTO {
    @Expose()
    @IsIn(['Mr', 'Ms'])
    title: string

    @Expose()
    @Transform(ToTrim)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    @Length(0, 32)
    firstName: string

    @Expose()
    @IsOptional()
    @Transform(ToTrim)
    @Length(0, 32)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    middleName: string

    @Expose()
    @Transform(ToTrim)
    @Length(0, 32)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    lastName: string

    @Expose()
    fullName: string

    @Expose()
    @IsDateString()
    dob: string

    @Expose()
    @IsOptional()
    @IsIn(['M', 'F'])
    gender: string

    @Expose()
    @IsIn(['AU'])
    countryCode: string

    @Expose()
    @IsNotEmpty()
    residentialAddress: string

    @Expose()
    @Matches(
        new RegExp(
            '^(?:\\+?(61))? ?(?:\\((?=.*\\)))?(0?[2-57-8])\\)? ?(\\d\\d(?:[- ](?=\\d{3})|(?!\\d\\d[- ]?\\d[- ]))\\d\\d[- ]?\\d[- ]?\\d{3})$'
        )
    )
    phoneNumber: string

    @Expose()
    @IsEmail()
    email: string

    @Expose()
    @IsBoolean()
    isDepositLimit: boolean

    @Expose()
    @IsNumber()
    depositLimitValue: number

    @Expose()
    @IsOptional()
    @IsIn([1, 7, 14, 30, 99])
    depositLimitPeriodInHour: number

    @Expose()
    @Matches(
        new RegExp(
            '^(?=[a-zA-Z0-9\\._-]{6,48})([a-zA-Z0-9]([._-]?[a-zA-Z0-9])*)$'
        )
    )
    userName: string

    @Expose()
    @Matches(new RegExp('^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$'))
    password: string

    @Expose()
    @IsIP()
    @IsNotEmpty()
    userIp: string

    @Expose()
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
    @Matches(new RegExp('^[a-zA-Z0-9 ]+$'))
    streetName: string

    @Expose()
    @Matches(new RegExp('^[a-zA-Z -]+$'))
    suburbAddress: string

    @Expose()
    @Matches(new RegExp('^[0-9]{4,4}$'))
    postcode: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    deviceCode: string

    @Expose()
    @IsOptional()
    deviceName: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    tokenFireBase: string

    @Expose()
    @IsOptional()
    devicePlatform: string

    @Expose()
    @IsOptional()
    deviceVersion: string

    @Expose()
    @IsOptional()
    wolfdenAppVersion: string

    @Expose()
    @IsOptional()
    refCode: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    coloUserName: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    coloPassword: string

    static fromReq = (req: Request): CreateUserDTO => {
        return plainToInstance(CreateUserDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }

    static toUserAdvance = (dto: CreateUserDTO): UserAdvance => {
        return plainToInstance(UserAdvance, dto)
    }
}
