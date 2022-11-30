CREATE PROCEDURE `usp_UserFollow_getListFollow`(
	IN pUserId  INT,
	IN pLimit INT,
	IN pOffset INT,
	IN pIsFollow TINYINT
)
SP: BEGIN

		DROP TEMPORARY TABLE IF EXISTS tmp_followable;
		CREATE TEMPORARY TABLE tmp_followable 
            SELECT * FROM User WHERE UserId != pUserId;
			
		DROP TEMPORARY TABLE IF EXISTS tmp_following;
		CREATE TEMPORARY TABLE tmp_following 
            SELECT UserId FROM UserFollow WHERE FollowerUserId = pUserId;
		
		DROP TEMPORARY TABLE IF EXISTS tmp_res;
		CREATE TEMPORARY TABLE tmp_res 
		SELECT 
			u.UserId AS UserId,
			u.FirstName AS FirstName,
			u.MiddleName MiddleName,
			u.LastName AS LastName,
			u.FullName as FullName,
			u.UserName  AS UserName,
			u.ProfileUrl AS ProfileUrl,
			CASE WHEN uf.UserId IS NULL THEN 0 ELSE 1 END AS IsFollowing 
		FROM tmp_followable u 
		LEFT JOIN tmp_following uf 
		ON u.UserId = uf.UserId 
		WHERE u.UserId > 194
		LIMIT pLimit OFFSET pOffset;
		
		IF pIsFollow IS NOT NULL THEN
			SELECT DISTINCT * FROM tmp_res WHERE IsFollowing = pIsFollow;
		ELSE
			SELECT DISTINCT * FROM tmp_res WHERE IsFollowing IS NOT NULL;
		END IF;
		
END SP