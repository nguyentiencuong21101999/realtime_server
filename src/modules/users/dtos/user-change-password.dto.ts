import { Expose, plainToInstance } from 'class-transformer'
import { Matches } from 'class-validator'
import { Request } from 'express'

export class UserChangePasswordDTO {
    @Expose()
    currentPassword: string

    @Expose()
    @Matches(new RegExp('^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$'))
    password: string

    static fromReq = (req: Request) => {
        return plainToInstance(UserChangePasswordDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }
}
