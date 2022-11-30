CREATE PROCEDURE `usp_UserFollow_getListPunterToFollowBySportId`( 
			IN pUserId INT
			, IN pSportId VARCHAR(512)
            , IN pOffset INT
            , IN pLimit INT
        )
BEGIN
	/*
		CALL usp_UserFollow_getListPunterToFollowBySportId(
				NULL -- pUserId
                ,'1,2' -- pSportId
                ,0 -- pOffset
                ,10 -- pLimit
                );
    */
	CALL STRING_SPLIT(pSportId,',');
    
    DROP TEMPORARY TABLE IF EXISTS tblSport;
    CREATE TEMPORARY TABLE tblSport
    SELECT CAST(val AS UNSIGNED) AS SportId 
    FROM STRING_SPLIT
    ;

	DROP TEMPORARY TABLE IF EXISTS tblResult;
    CREATE TEMPORARY TABLE tblResult
	SELECT DISTINCT sur.UserId
    FROM SportUserRank sur
		INNER JOIN tblSport spo on spo.SportId = sur.SportId
    ORDER BY TotalRank DESC
    LIMIT pOffset, pLimit
    ;
    
    -- SELECT * FROM tblResult;
    SELECT rs.UserId,
			usr.FirstName 	AS FirstName,
			usr.MiddleName 	AS MiddleName,
			usr.LastName 	AS LastName,
			usr.FullName 	AS FullName,
			usr.UserName  	AS UserName,
			usr.ProfileUrl 	AS ProfileUrl,
            IF(ufw.UserId IS NULL, 0, 1) AS IsFollowing
    FROM tblResult rs
		INNER JOIN `User` usr 		ON usr.UserId = rs.UserId
        LEFT JOIN UserFollow ufw 	ON ufw.FollowerUserId = rs.UserId
	;
END