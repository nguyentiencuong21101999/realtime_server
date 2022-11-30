CREATE PROCEDURE `usp_UserFollow_getListFollower`(
	IN pUserId INT,
	IN pKeyword VARCHAR(255) CHARSET utf8mb4 COLLATE 'utf8mb4_general_ci',
	IN pOffset INT,
  	IN pLimit INT,
	IN pIsCount TINYINT
)
BEGIN
		/*
		CALL usp_UserFollow_getListFollower_bk (
			1
			,'k' -- pKeyword
			,0 -- pOffset
			,10 -- pLimit
			,false -- pIsCount
        )
    */
	
	-- List of user following by user id
	DROP TEMPORARY TABLE IF EXISTS tbFollowing;
		CREATE TEMPORARY TABLE tbFollowing 
            SELECT UserId FROM UserFollow WHERE FollowerUserId = pUserId;
		
	IF pKeyword IS NULL OR pKeyword = '' THEN
    
		SELECT StatsValueInt
		INTO @vTotalFollower
		FROM StatsUser
		WHERE UserId = pUserId
			AND StatsType = 1
		LIMIT 1
		;
        
		CALL cmm_GetPaging(@vTotalFollower, pOffset, pLimit, @vStartIndex, @vEndIndex);
        
		IF pIsCount = 1 THEN
			SELECT
				COUNT(*) AS Total
			FROM UserFollow uf
				INNER JOIN `User` u ON uf.FollowerUserId = u.UserId
			WHERE uf.UserId 								= pUserId
			;
		ELSE
			SELECT u.UUID 			AS UUID,
					u.FirstName 		AS FirstName,
					u.MiddleName 		AS MiddleName,
					u.LastName 			AS LastName,
					u.FullName 			AS FullName,
					u.UserName  		AS UserName,
					u.ProfileUrl 		AS ProfileUrl,
					uf.PagingByUserId,
					CASE WHEN u.DeletedDate IS NULL THEN 0 ELSE 1 END AS IsDeleted,
					CASE WHEN tf.UserId IS NULL THEN 0 ELSE 1 END AS IsFollowing
			FROM UserFollow uf
				INNER JOIN `User` u ON uf.FollowerUserId = u.UserId
				LEFT JOIN tbFollowing tf ON uf.FollowerUserId = tf.UserId
			WHERE uf.UserId 								= pUserId
				AND uf.PagingByUserId 				>= @vStartIndex
				AND uf.PagingByUserId 				<= @vEndIndex
			ORDER By uf.UserFollowId DESC
			;
		END IF;
		
	ELSE 
		
		IF pIsCount = 1 THEN
			SELECT
				COUNT(*) AS Total
			FROM UserFollow uf
				INNER JOIN `User` u ON uf.FollowerUserId = u.UserId
			WHERE uf.UserId = pUserId
						AND (u.FullName LIKE CONCAT('%', pKeyword, '%') OR u.UserName LIKE CONCAT('%', pKeyword, '%'))
			;
		ELSE 
			SELECT u.UUID 				AS UUID,
					u.FirstName 			AS FirstName,
					u.MiddleName 			AS MiddleName,
					u.LastName 				AS LastName,
					u.FullName 				AS FullName,
					u.UserName  			AS UserName,
					u.ProfileUrl 			AS ProfileUrl,
					uf.PagingByUserId,
					CASE WHEN u.DeletedDate IS NULL THEN 0 ELSE 1 END AS IsDeleted,
					CASE WHEN tf.UserId IS NULL THEN 0 ELSE 1 END AS IsFollowing
			FROM UserFollow uf
				INNER JOIN `User` u ON uf.FollowerUserId = u.UserId
				LEFT JOIN tbFollowing tf ON uf.FollowerUserId = tf.UserId
			WHERE uf.UserId = pUserId
				AND (u.FullName LIKE CONCAT('%', pKeyword, '%') OR u.UserName LIKE CONCAT('%', pKeyword, '%')) 
			ORDER By uf.UserFollowId DESC
			LIMIT pOffset, pLimit
			;
		END IF;
		
   END IF;
END