"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullUrl = exports.userAssetDir = exports.StorageDir = exports.uploadVideo = exports.uploadImage = void 0;
const path_1 = __importDefault(require("path"));
const configs_1 = require("../configs");
const error_1 = require("./error");
const supportedImageTypes = new Set(['.jpeg', '.jpg', '.png', '.heic']);
const supportedVideoTypes = new Set(['.mp4', '.mov']);
const imageFilter = (req, file, callback) => {
    var _a;
    if (supportedImageTypes.has((_a = path_1.default.extname(file.originalname)) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
        callback(null, true);
        return;
    }
    callback(error_1.Errors.InvalidImageType);
};
const videoFilter = (req, file, callback) => {
    var _a;
    if (supportedVideoTypes.has((_a = path_1.default.extname(file.originalname)) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
        callback(null, true);
        return;
    }
    callback(error_1.Errors.InvalidVideoType);
};
const uploadImage = (directory, filename = null) => { };
exports.uploadImage = uploadImage;
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
const uploadVideo = (directory, filename = null) => { };
exports.uploadVideo = uploadVideo;
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
var StorageDir;
(function (StorageDir) {
    StorageDir["Profiles"] = "profiles";
    StorageDir["Tweets"] = "tweets";
    StorageDir["Chats"] = "chats";
})(StorageDir = exports.StorageDir || (exports.StorageDir = {}));
const userAssetDir = (name, dir) => {
    return ['assets/users', name, dir].join('/');
};
exports.userAssetDir = userAssetDir;
const fullUrl = (path) => {
    if (path) {
        return configs_1.config.awsS3Location + '/' + path;
    }
    return path;
};
exports.fullUrl = fullUrl;
//# sourceMappingURL=s3.js.map