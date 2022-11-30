import { Expose, plainToInstance } from 'class-transformer'
import { Matches } from 'class-validator'
import { Request } from 'express'

export class UserRequestResetPasswordDTO {
    userName: string
    firstName: string
    lastName: string
    dob: Date
    phoneNumber: string
}
export class UserResetPasswordDTO {
    @Expose()
    @Matches(new RegExp('^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$'))
    password: string

    @Expose()
    token: string

    @Expose()
    userId: number

    static fromReq = (req: Request) => {
        return plainToInstance(UserResetPasswordDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }
}
