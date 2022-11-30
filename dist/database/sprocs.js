"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprocs = void 0;
exports.Sprocs = {
    /** USER */
    /** usp_User_getDetail(userId) */
    UserGetProfile: 'usp_User_getDetail',
    /** usp_User_getDetail(userId) */
    UserGetProfileByUUID: 'usp_User_getDetailByUUID',
    /** usp_UserFollow_getListFollow(userId, limit, offset, isFollow) */
    UserGetListFollow: 'usp_UserFollow_getListPunterToFollowBySportId',
    /** usp_UserFollow_getListFollowing(userId, page, keyword) */
    UserGetListFollowing: 'usp_UserFollow_getListFollowing',
    /** usp_UserFollow_getListPublicFollowing(userId_of_uuid,userId, page, keyword) */
    UserGetListPublicFollowing: 'usp_UserFollow_getListPublicFollowing',
    /** usp_UserFollow_getListFollowing(userId, page, keyword) */
    UserGetListFollower: 'usp_UserFollow_getListFollower',
    /** usp_UserFollow_getListFollowing(userId, page, keyword) */
    UserGetListFollowRequest: 'usp_UserFollow_getListFollowRequest',
    /** usp_UserFollow_getListFollowing(userId_of_uuid,userId, page, keyword) */
    UserGetListPublicFollower: 'usp_UserFollow_getListPublicFollower',
    /** usp_User_getListUserAdmin(userId) */
    UserGetListUserByAdmin: 'usp_User_getListUserByAdmin',
    /** usp_UserFollow_getListPunterToFollowBySportId(userId, sportId, offset, limit) */
    UserFollowGetListPunterToFollowBySportId: 'usp_UserFollow_getListPunterToFollowBySportId',
    /** usp_UserActionTracking_getListHistory(userId, limit, offset) */
    UserGetListHistory: 'usp_UserActionTracking_getListHistory',
    /** usp_User_InitialData(userId) */
    UserInitData: 'usp_User_InitialData',
    /** usp_User_getListEmailAdmin() */
    UserGetListEmailAdmin: 'usp_User_getListEmailAdmin',
    /** usp_User_getListUserIdAdmin() */
    UserGetListUserIdAdmin: 'usp_User_getListUserIdAdmin',
    /** usp_User_getListUserIdAdmin() */
    UserGetListUserAddFollowingAdmin: 'usp_User_getListUserAddFollowingAdmin',
    /** usp_User_getUserWolfdenAccount() */
    UserGetUserWolfdenAccount: 'usp_User_getUserWolfdenAccount',
    /** usp_User_getUserWolfdenSupport() */
    UserGetUserWolfdenSupport: 'usp_User_getUserWolfdenSupport',
    /** TWEET */
    /** usp_Tweet_getDetails(tweetId) */
    TweetGetDetails: 'usp_Tweet_getDetails',
    /** usp_Tweet_getDetails(tweetId) */
    TweetGetFeedDetails: 'usp_Tweet_getFeedDetails',
    /** usp_Tweet_getFeed(userId, offset, limit) */
    TweetGetFeed: 'usp_Tweet_getFeed',
    /** usp_Tweet_getCopyBet(userId, offset, limit) */
    TweetGetCopyBet: 'usp_Tweet_getCopyBet',
    /** usp_Tweet_getFeed(userId,raceType,tweetType, offset, limit) */
    TweetGetRaceFeed: 'usp_Tweet_getRaceFeed',
    /** `usp_Tweet_getOwnerFeed`(pUserId INT, pOffset INT, pLimit INT) */
    TweetGetOwnerFeed: 'usp_Tweet_getOwnerFeed',
    /** `usp_Tweet_getOwnerFeedByUUID`(pUserId INT,pUserIdOfUUID INT, pOffset INT, pLimit INT) */
    TweetGetOwnerFeedByUUID: 'usp_Tweet_getOwnerFeedByUUID',
    /** usp_TweetFollower_InsertByTweetId(tweetId) */
    TweetFollowerInsertByTweetId: 'usp_TweetFollower_InsertByTweetId',
    /** usp_TweetLike_getListUserLike(userId, tweetId,offset, limit) */
    TweetGetListUserLike: 'usp_TweetLike_getListUserLike',
    /** usp_TweetUserSaved_getListTweetSaved(userId, limit, offset) */
    TweetGetListTweetSaved: 'usp_TweetUserSaved_getListTweetSaved',
    /** usp_TweetUserSaved_getListTweetComment(tweetId,parentTweetCommentId, limit, offset) */
    TweetGetListTweetComment: 'usp_TweetComment_getListTweetComment',
    /** usp_TweetComment_getDetailTweetComment(tweetId,tweetCommentId, limit, offset) */
    TweetGetDetailTweetComment: 'usp_TweetComment_getDetailTweetComment',
    /** usp_TweetLike_getListUserCommentLike(userId, tweetId,tweetCommentId,offset, limit) */
    TweetGetListUserCommentLike: 'usp_TweetCommentLike_getListUserCommentLike',
    /** usp_Tweet_getListPost(offset, limit) */
    TweetGetListPost: 'usp_Tweet_getListPost',
    /** usp_Tweet_getListPost(search,status,order,by,offset, limit) */
    TweetGetListPostReport: 'usp_Tweet_getListPostReport',
    /** usp_Tweet_getListPost(tweetId,reasonId,reportStatus,startDate,endDate,offset, limit) */
    TweetGetListPostReportDetail: 'usp_Tweet_getListPostReportDetail',
    /** usp_Tweet_getPostDetails(tweetId) */
    TweetGetPostDetails: 'usp_Tweet_getPostDetails',
    /** SPORT */
    SportGetList: 'usp_Sport_getListSport',
    /** NOTIFICATION */
    /** usp_NotiReceiver_getListByUserId(userId, limit, offset) */
    NotificationGetListByUserId: 'usp_NotiReceiver_getListByUserId',
    /** KEYWORD */
    /** usp_Keyword_searchTop(keyword, keywordType, userId, limit, offset) */
    KeywordSearchTop: 'usp_Keyword_searchTop',
    /** usp_Keyword_searchLatest(keyword, keywordType, userId, limit, offset) */
    KeywordSearchLatest: 'usp_Keyword_searchLatest',
    /** usp_Keyword_searchUser(keyword, keywordType, userId, limit, offset) */
    KeywordSearchUser: 'usp_Keyword_searchUser',
    /** KEYWORD */
    /** usp_dashBoard(startDate,endDate) */
    DashBoard: 'usp_dashBoard',
};
//# sourceMappingURL=sprocs.js.map