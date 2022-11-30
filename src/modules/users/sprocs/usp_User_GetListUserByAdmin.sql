CREATE PROCEDURE `usp_User_getListUserByAdmin`(
	IN pUserId INT,
	IN pRole INT,
	IN pStatus INT,
	IN pVerify INT,
	IN pSearch VARCHAR (255) CHARSET utf8mb4 COLLATE 'utf8mb4_general_ci',
	IN pLimit INT,
	IN pOffset INT,
	IN pOrder VARCHAR (255),
	IN pBy VARCHAR (255),
	IN pIsCount TINYINT
)
SP: BEGIN
	/*
		CALL usp_User_getListUserByAdmin_bk(
				1 -- pUserId
				,NULL -- ROLE
				,NULL -- pStatus
				,NULL -- pVerify
				,NULL -- pSearch
				,0 -- pLimit
				,10 -- pOffset
				,false -- pIsCount
		)
	*/
	
	DROP TEMPORARY TABLE IF EXISTS tblTempUser ;
	SET @vquery = '
								 CREATE TEMPORARY TABLE tblTempUser 
								 SELECT usr.UserId, url.RoleId
								 FROM User usr INNER JOIN UserRole url ON url.UserId = usr.UserId ';
								 
								 
	SET @vCondition = ' WHERE usr.DeletedDate IS NULL ' ;
	
	IF pOrder IS NOT NULL THEN 
		SET @vOrder = CONCAT(' ORDER BY ',pOrder,' ',pBy);
	ELSE 
		SET @vOrder = ' ORDER BY usr.UserId DESC ';
	END IF;
	
	IF pLimit IS NOT NULL AND pIsCount != 1 THEN
		SET @vPaging = CONCAT(' LIMIT ',pLimit,' OFFSET ',pOffset );
	ELSE
		SET @vPaging = '';
	END IF;
  
	IF pUserId IS NOT NULL THEN
		SET @vCondition = CONCAT(@vCondition , ' AND usr.UserId != ', pUserId);
	END IF;
	
	IF pRole IS NOT NULL THEN
		SET @vCondition = CONCAT(@vCondition , ' AND url.RoleId = ', pRole);
	END IF;
	
	IF pStatus IS NOT NULL THEN
		SET @vquery = CONCAT(@vquery, ' LEFT JOIN UserBlocked blk ON usr.UserId = blk.BlockedUserId ');
-- 		SET @vCondition = CONCAT(@vCondition , ' AND blk.FromDate >= now() AND blk.ToDate <= now() ');
		SET @vCondition = CONCAT(@vCondition , ' AND blk.UserBlockedId ', CASE WHEN pStatus = 0 THEN ' IS NULL ' ELSE ' IS NOT NULL ' END);
	END IF;
	
	IF pVerify IS NOT NULL THEN
		SET @vCondition = CONCAT(@vCondition , ' AND usr.IsAuthenticProfile = ', pVerify);
	END IF;


	IF COALESCE(pSearch,'') <> '' THEN
		SET @vCondition = CONCAT(@vCondition , ' AND (usr.UserName 	LIKE ''%',pSearch,'%''
																									OR usr.FullName LIKE ''%',pSearch,'%''
																									OR usr.Email 	LIKE ''%',pSearch,'%'' )');
	END IF;
	
	SET @vquery = CONCAT(@vquery, @vCondition);
	-- select @vquery;
  PREPARE stmt3 FROM @vquery;
  EXECUTE stmt3;
  DEALLOCATE PREPARE stmt3;
	
	IF pIsCount = 1 THEN 
		SELECT 
				COUNT(*) AS Total
		FROM tblTempUser tem
				INNER JOIN `User` usr on usr.UserId = tem.UserId
				LEFT JOIN UserBlocked ubk on ubk.BlockedUserId = tem.UserId;
	ELSE
		SET @tquery = '
		SELECT 
			usr.*,
				tem.RoleId,
			IF(ubk.UserBlockedId IS NULL,0 , 1 ) AS IsUserBlocked
		FROM tblTempUser tem
			INNER JOIN `User` usr on usr.UserId = tem.UserId
			LEFT JOIN UserBlocked ubk on ubk.BlockedUserId = tem.UserId';
			
		SET @tquery = CONCAT(@tquery,@vOrder,@vPaging);
		PREPARE stmt4 FROM @tquery;
		EXECUTE stmt4;
		DEALLOCATE PREPARE stmt4;
	END IF;
	
END SP