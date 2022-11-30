CREATE PROCEDURE `usp_UserFollow_getListFollowing`(
	IN pUserId INT,
	IN pKeyword VARCHAR(255) CHARSET utf8mb4 COLLATE 'utf8mb4_general_ci',
	IN pOffset INT,
  IN pLimit INT,
	IN pIsCount TINYINT
)
BEGIN
		/*
		CALL usp_UserFollow_getListFollowing (
				1
				,'k' -- pKeyword
				,0 -- pOffset
				,10 -- pLimit
				,false -- pIsCount
				)
    */
	
	-- List of user follower by user id
	DROP TEMPORARY TABLE IF EXISTS tbFollower;
		CREATE TEMPORARY TABLE tbFollower 
            SELECT FollowerUserId FROM UserFollow WHERE UserId = pUserId;
		
	IF pKeyword IS NULL OR pKeyword = '' THEN
    
		SELECT StatsValueInt
		INTO @vTotalFollowing
		FROM StatsUser
		WHERE UserId = pUserId
			AND StatsType = 2
		LIMIT 1
		;
        
		CALL cmm_GetPaging(@vTotalFollowing, pOffset, pLimit, @vStartIndex, @vEndIndex);
        
		IF pIsCount = 1 THEN
			SELECT
				COUNT(*) AS Total
			FROM UserFollow uf
			WHERE uf.FollowerUserId 								= pUserId
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
					CASE WHEN tf.FollowerUserId IS NULL THEN 0 ELSE 1 END AS IsFollower
			FROM UserFollow uf
				INNER JOIN `User` u ON uf.UserId = u.UserId
				LEFT JOIN tbFollower tf ON uf.UserId = tf.FollowerUserId
			WHERE uf.FollowerUserId 								= pUserId
				AND uf.PagingByFollowerUserId 				>= @vStartIndex
				AND uf.PagingByFollowerUserId 				<= @vEndIndex
			ORDER By uf.UserFollowId DESC
			;
		END IF;
		
	ELSE 
	
		
		IF pIsCount = 1 THEN
			SELECT
				COUNT(*) AS Total
			FROM UserFollow uf
			WHERE uf.FollowerUserId = pUserId
						AND (u.FullName LIKE CONCAT('%', pKeyword, '%') OR u.UserName LIKE CONCAT('%', pKeyword, '%')) 
			;
		ELSE 
			SELECT u.UUID 					AS UUID,
							u.FirstName 			AS FirstName,
							u.MiddleName 			AS MiddleName,
							u.LastName 				AS LastName,
							u.FullName 				AS FullName,
							u.UserName  			AS UserName,
							u.ProfileUrl 			AS ProfileUrl,
							uf.PagingByUserId,
							CASE WHEN u.DeletedDate IS NULL THEN 0 ELSE 1 END AS IsDeleted,
							CASE WHEN tf.FollowerUserId IS NULL THEN 0 ELSE 1 END AS IsFollower
			FROM UserFollow uf
				INNER JOIN `User` u ON uf.UserId = u.UserId
				LEFT JOIN tbFollower tf ON uf.UserId = tf.FollowerUserId
			WHERE uf.FollowerUserId = pUserId
						AND (u.FullName LIKE CONCAT('%', pKeyword, '%') OR u.UserName LIKE CONCAT('%', pKeyword, '%')) 
			ORDER By uf.UserFollowId DESC
			LIMIT pOffset, pLimit
			;
		END IF;
		
   END IF;
END