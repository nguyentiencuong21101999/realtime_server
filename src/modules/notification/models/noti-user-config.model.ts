import { DataTypes } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    Column,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { Errors } from '../../../helpers/error'
import { BaseModel } from '../../base/base.enity'
import { NotiUserConfigReqDTO } from '../dtos/noti-user-config.dto'
import { NotiTypes } from './noti-type.model'

@Table({ tableName: 'NotiUserConfig' })
export default class NotiUserConfig extends BaseModel<NotiUserConfig> {
    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'UserId', type: DataTypes.BIGINT })
    userId: number

    @PrimaryKey
    @Column({ field: 'NotiTypeId', type: DataTypes.SMALLINT })
    notiTypeId: number

    @AllowNull(false)
    @Column({ field: 'IsTurnOnNoti', type: DataTypes.TINYINT })
    isTurnOnNoti: number

    static getConfigs = async (userId: number) => {
        const configs = NotiUserConfig.findAll({
            where: {
                userId: userId,
            },
        })
        return configs
    }

    static enable = async (params: NotiUserConfigReqDTO) => {
        const [instance] = await NotiUserConfig.upsert({
            isTurnOnNoti: params.isTurnOnNoti ? 1 : 0,
            userId: params.userId,
            notiTypeId: params.notiTypeId,
        })
        if (instance) {
            return
        }
        throw Errors.NotificationConfigUpdateFailed
    }

    static getConfig = async (userId: number, notiType: NotiTypes) => {
        const config = await NotiUserConfig.findOne({
            where: {
                userId: userId,
                notiTypeId: notiType,
            },
        })
        return config
    }
}
