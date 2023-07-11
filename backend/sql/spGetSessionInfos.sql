DELIMITER $$
DROP PROCEDURE IF EXISTS spGetSessionInfos
$$

CREATE PROCEDURE spGetSessionInfos (
  pSessionId INT
)
/***********************************************************
 *  Procedure: spGetSessionInfos
 *
 *  Purpose:
 *    
 *
 *  Usage:
 *    
 *  Notes:
 *
 *  Created:   KNN     2023-07-11
 *  Modified
 *  Date         Author      Description
 *----------------------------------------------------------
 ***********************************************************/
BEGIN
  SELECT SessionId      as sessionid
        ,ClientId       as clientid
        ,SessionDate    as sessiondate
        ,Issue          as issue
        ,Response       as response
    FROM SessionInfos
   WHERE DateDeleted IS NULL
     AND (SessionId = pSessionId OR IF( pSessionId <= 0, 1, 0) = 1);
END
$$
DELIMITER ;

