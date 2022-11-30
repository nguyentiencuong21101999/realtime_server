CREATE PROCEDURE `usp_UserActionTracking_getListHistory`( 
IN p_user_id INT, 
IN p_limit INT, 
IN p_offset INT 
)
SP : BEGIN
	SELECT
		uat.*,
		u.UserName,
		u.ProfileUrl,
		u.FullName 
	FROM
		UserActionTracking uat
		INNER JOIN User u ON uat.CreatedBy = u.UserId 
	WHERE
		uat.UserId = p_user_id 
	ORDER BY
		uat.UserActionTrackingId DESC 
		LIMIT p_limit OFFSET p_offset;

END SP