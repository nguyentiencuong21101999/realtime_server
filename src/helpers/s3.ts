import { Request } from 'express'
import multer from 'multer'
import path from 'path'
import { config } from '../configs'
import { Errors } from './error'

const supportedImageTypes = new Set(['.jpeg', '.jpg', '.png', '.heic'])
const supportedVideoTypes = new Set(['.mp4', '.mov'])

const imageFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    if (
        supportedImageTypes.has(path.extname(file.originalname)?.toLowerCase())
    ) {
        callback(null, true)
        return
    }
    callback(Errors.InvalidImageType)
}

const videoFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    if (
        supportedVideoTypes.has(path.extname(file.originalname)?.toLowerCase())
    ) {
        callback(null, true)
        return
    }
    callback(Errors.InvalidVideoType)
}

export const uploadImage = (directory: string, filename: string = null) => {}
//     multer({
//         fileFilter: imageFilter,
//         storage: multerS3({
//             bucket: config.awsBucketName,
//             acl: 'public-read',
//             contentType: (req: Request, file, cb) => {
//                 cb(null, file.mimetype)
//             },
//             key: (req: Request, file, callback) => {
//                 const name =
//                     (filename ? `${filename}_` : '') +
//                     randomUUID().replace(/-/g, '')
//                 const ext = path.extname(file.originalname)?.toLowerCase() || ''
//                 callback(null, directory + '/' + name + ext)
//             },
//         }),
//         limits: {
//             fileSize: 5 * 1024 * 1024,
//         },
//     })

export const uploadVideo = (directory: string, filename: string = null) => {}
// multer({
//     fileFilter: videoFilter,
//     storage: multerS3({
//         s3,
//         bucket: config.awsBucketName,
//         acl: 'public-read',
//         contentType: (req: Request, file, cb) => {
//             cb(null, file.mimetype)
//         },
//         key: (req: Request, file, callback) => {
//             const name =
//                 (filename ? `${filename}_` : '') +
//                 randomUUID().replace(/-/g, '')
//             const ext = path.extname(file.originalname)?.toLowerCase() || ''
//             callback(null, directory + '/' + name + ext)
//         },
//     }),
//     limits: {
//         fileSize: 100 * 1024 * 1024,
//     },
// })

export enum StorageDir {
    Profiles = 'profiles',
    Tweets = 'tweets',
    Chats = 'chats',
}

export const userAssetDir = (name: string, dir: StorageDir) => {
    return ['assets/users', name, dir].join('/')
}

export const fullUrl = (path: string) => {
    if (path) {
        return config.awsS3Location + '/' + path
    }
    return path
}
