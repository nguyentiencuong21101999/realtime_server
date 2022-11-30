CREATE PROCEDURE `usp_User_getDetailByUUID`(
    	IN pUserId INT ,
		IN pUUID VARCHAR(255) 
)
SP: BEGIN
    SELECT *,CASE WHEN uf.UserFollowId IS NULL THEN 0 ELSE 1 END AS IsFollowing FROM User u
    LEFT JOIN UserAdvance ua
    ON u.UserId = ua.UserId
		LEFT JOIN UserFollow uf
		ON u.UserId = uf.UserId AND uf.FollowerUserId = pUserId  
    WHERE u.UUID = pUUID   AND u.DeletedDate IS NULL;
END SP;