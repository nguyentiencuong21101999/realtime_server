import { config } from './configs'
import { AuthMiddleWare } from './modules/auth/auth.middleware'
import { AuthService } from './modules/auth/auth.service'
import { MailService } from './modules/mail/mail.service'
import { mailQueue } from './modules/queue/mail-queue.service'
import { redisService } from './modules/redis/redis.service'
import { UserService } from './modules/users/user.service'

export const authService = new AuthService(config, redisService)
export const authMiddleware = new AuthMiddleWare(authService)

export const mailService = new MailService(config, mailQueue)

export const userService = new UserService(config, authService)
