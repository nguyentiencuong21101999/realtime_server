CREATE PROCEDURE `usp_User_getDetail`(
    IN pUserId INT
)

SP: BEGIN
    SELECT * FROM User u
    LEFT JOIN UserAdvance ua
    ON u.UserId = ua.UserId
    INNER JOIN UserRole ur
    on u.UserId = ur.UserId
    WHERE u.UserId = pUserId AND u.DeletedDate IS NULL;
END SP;