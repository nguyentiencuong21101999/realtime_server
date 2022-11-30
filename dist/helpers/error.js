"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.Errors = exports.ErrorResp = void 0;
const class_transformer_1 = require("class-transformer");
const logger_1 = require("./logger");
const response_wrapper_1 = require("./response.wrapper");
const utils_1 = require("./utils");
class ErrorResp extends Error {
    constructor(code, message, status) {
        super();
        this.status = status;
        this.code = code;
        this.message = message;
        this.stack = undefined;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ErrorResp.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ErrorResp.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ErrorResp.prototype, "message", void 0);
exports.ErrorResp = ErrorResp;
exports.Errors = {
    BadRequest: new ErrorResp('error.badRequest', 'Bad request', 400),
    Unauthorized: new ErrorResp('error.unauthorized', 'Unauthorized', 401),
    Forbidden: new ErrorResp('error.forbiden', 'Forbidden', 403),
    Sensitive: new ErrorResp('error.sensitive', 'An error occurred, please try again later.', 400),
    InternalServerError: new ErrorResp('error.internalServerError', 'Internal server error.', 500),
    AlreadyHaveColossalAccount: new ErrorResp('error.alreadyHaveColossalAccount', 'Already have colossal account.'),
    ColossalAccountWrongUserNameOrPassword: new ErrorResp('error.colossalAccountWrongUserNameOrPassword', 'colossal account wrong username or password.'),
    ColossalAccountIsLinked: new ErrorResp('error.colossalAccountIsLinked', 'colossal account is linked.'),
    AccountWolfdenIsLinked: new ErrorResp('error.accountWolfdenIsLinked', 'Account wolfden is linked.'),
    AlreadyHaveWolfdenAccount: new ErrorResp('error.alreadyHaveWolfdenAccount', 'Already have wolfden account.'),
    ExistedEmail: new ErrorResp('error.existedEmail', 'Email existed.'),
    ExistedPhoneNumber: new ErrorResp('error.existedPhoneNumber', 'Phone number existed.'),
    UserNotFound: new ErrorResp('error.userNotFound', 'User not found.'),
    InvalidAccount: new ErrorResp('error.invalidAccount', 'Invalid username or password.'),
    UpdateProfileFailed: new ErrorResp('error.updateProfileFailed', 'Failed to update user profile.'),
    InvalidImageType: new ErrorResp('error.invalidImageType', 'Invalid image type.'),
    InvalidVideoType: new ErrorResp('error.invalidVideoType', 'Invalid video type.'),
    InvalidMediaType: new ErrorResp('error.invalidMediaType', 'Invalid media type.'),
    SportNotFound: new ErrorResp('error.sportNotFound', 'Sport not found.'),
    SportFavoriteExisted: new ErrorResp('error.sportFavoriteExisted', 'Sport favorite existed.'),
    InvalidCurrentPassword: new ErrorResp('error.invalidCurrentPassword', 'Invalid current password.'),
    InvalidAccountRequestResetPassword: new ErrorResp('error.invalidAccountRequestResetPassword', 'Invalid account request reset password.'),
    TokenUsed: new ErrorResp('error.tokenUsed', 'Token used.'),
    TokenExpired: new ErrorResp('error.tokenExpired', 'Token expired.'),
    SendMailFailed: new ErrorResp('err.sendMailFailed', 'Failed to send mail.'),
    ChangePasswordFailed: new ErrorResp('error.changePasswordFailed', 'Failed to change password.'),
    UserNotFollowing: new ErrorResp('error.userNotFollowing', 'User is not following you.'),
    UserAlreadyFollowed: new ErrorResp('error.alreadyFollowed', 'User already followed.'),
    InvalidRole: new ErrorResp('error.invalidRole', 'Invalid role.'),
    AccountBlocked: new ErrorResp('error.accountBlocked', 'Account is blocked.'),
    TweetNotFound: new ErrorResp('error.tweetNotFound', 'Tweet not found.'),
    TweetCommentNotFound: new ErrorResp('error.tweetCommentNotFound', 'Tweet comment not found.'),
    NotificationConfigUpdateFailed: new ErrorResp('error.notificationConfigUpdateFailed', 'Failed to update user notification config.'),
    NotificationReadFailed: new ErrorResp('error.notificationReadFailed', 'Failed to read notification.'),
    AlreadyRetweeted: new ErrorResp('error.alreadyRetweeted', 'Already retweeted.'),
    TweetIsNotCopyBet: new ErrorResp('error.tweetIsNotCopyBet', 'Tweet is not copy bet.'),
    InvalidTokenGenWeb: new ErrorResp('error.invalidTokenGenWeb', 'Invalid token GenWeb.'),
    InvalidTextCommentAndMedias: new ErrorResp('error.invalidTextCommentAndMedias', 'TextComment and Medias empty'),
    InvalidMedias: new ErrorResp('error.invalidMedias', 'Medias not found'),
    InvalidSportRankConfigName: new ErrorResp('error.invalidSportRankConfigName', 'Invalid SportRankConfigName'),
    InvalidUserIdParams: new ErrorResp('error.invalidUserIdParams', 'userId params is equal to userId in token'),
    UserIdParamsNotFound: new ErrorResp('error.userIdParamsNotFound', 'userId params not found'),
    UserHasNotReTweeted: new ErrorResp('error.userHasNotReTweeted', 'User has not reTweeted.'),
    UserHasNotLiked: new ErrorResp('error.userHasNotLiked', 'User has not liked.'),
    UserHasNotSaved: new ErrorResp('error.userHasNotSaved', 'User has not saved.'),
    ParentTweetCommentIdIsNotParent: new ErrorResp('error.parentTweetCommentIdIsNotParent', 'ParentTweetCommentId is not parent.'),
    UserIsNotOwnerComment: new ErrorResp('error.userIsNotOwnerComment', 'User is not owner comment'),
    FollowerIsNotSentRequest: new ErrorResp('error.followerIsNotSentRequest', 'Follower is not sent request'),
    UserAlreadyReport: new ErrorResp('error.userAlreadyReport', 'User already report.'),
    ReasonNotFound: new ErrorResp('error.reasonNotFound', 'Reason not found.'),
    TweetHasNotReported: new ErrorResp('error.tweetHasNotReported', 'Tweet has not reported.'),
    ColoTokenInvalid: new ErrorResp('error.coloTokenInvalid', 'Colo token invalid.'),
    TransIdNotFound: new ErrorResp('error.transIdNotFound', 'TransId not found.'),
    MaximumWolfdenAccount: new ErrorResp('error.maximumWolfdenAccount', 'Maximum wolfden account.'),
    RefCodeNotFound: new ErrorResp('error.refCodeNotFound', 'RefCode not found.'),
    AccountClosed: new ErrorResp('error.accountClosed', 'Account is closed.'),
    AccountIsNotClosedByTime: new ErrorResp('error.accountIsNotClosedByTime', 'Account is not closed by time.'),
    PasswordIncorrect: new ErrorResp('error.passwordIncorrect', 'Password incorrect.'),
    InvalidPositionList: new ErrorResp('error.invalidPositionList', 'Invalid position list.'),
    AccountIsIpRestricted: new ErrorResp('error.accountIsIpRestricted', 'This account is IP-restricted due to incorrect login. Please contact our customer service!.'),
    AccountIsIpRestrictedWithTime: function (remainingTime) {
        const { day, time } = (0, utils_1.getFullDateAndTimeToDay)(remainingTime);
        return new ErrorResp('error.accountIsIpRestrictedWithTime', `This account is time-restricted due to incorrect login. Please try again after ${day} ${time} UTC!`);
    },
    AccountIsNotIpRestricted: new ErrorResp('error.accountIsNotIpRestricted', 'Account is not IP restricted.'),
    SendClientIpToAwsQueueErr: new ErrorResp('error.SendClientIpToAwsQueueErr', 'Error when send Client IP to AWS queue.'),
    UserIsNotWolfdenAccount: new ErrorResp('error.userIsNotWolfdenAccount', 'User is not wolfden account.'),
    InvalidBetRequestSource: new ErrorResp('error.invalidBetRequestSource', 'Invalid bet request source, must be from web/ios/android.'),
    BetSubmitFailed: new ErrorResp('error.betSubmitFailed', 'Not found bet response data.'),
    UserIsNotBlocked: new ErrorResp('error.userIsNotBlocked', 'User is not blocked.'),
    YouAreBlocked: new ErrorResp('error.youAreBlocked', 'You are blocked.'),
    UserIsABot: new ErrorResp('error.userIsABot', 'User is a bot.'),
    UnblockUserNotiFailed: new ErrorResp('error.unblockUserNotiFailed', 'Failed to unblock user notification.'),
    YouAreNotFollowing: new ErrorResp('error.youAreNotFollowing', 'You are not following this user.'),
};
const handleError = (err, res) => {
    if (err instanceof ErrorResp) {
        const errResp = err;
        res.status(errResp.status || exports.Errors.BadRequest.status).send(new response_wrapper_1.ResponseWrapper(null, (0, class_transformer_1.plainToInstance)(ErrorResp, errResp, {
            excludeExtraneousValues: true,
        })));
    }
    else {
        // if (isProduction) {
        //     res.status(Errors.Sensitive.status).send(
        //         new ResponseWrapper(null, Errors.Sensitive)
        //     )
        //     return
        // }
        logger_1.logger.error(JSON.stringify(err));
        const errResp = new ErrorResp(exports.Errors.InternalServerError.code, JSON.stringify(err), exports.Errors.InternalServerError.status);
        res.status(exports.Errors.Sensitive.status).send(new response_wrapper_1.ResponseWrapper(null, errResp));
    }
};
exports.handleError = handleError;
//# sourceMappingURL=error.js.map