DELIMITER $$
DROP PROCEDURE IF EXISTS spDeleteSessionInfo
$$

CREATE PROCEDURE spDeleteSessionInfo (
  pSessionId INT
 ,pLoginId   INT
)
/***********************************************************
 *  Procedure: spDeleteSessionInfo
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
  UPDATE SessionInfos
     SET DateDeleted = Now()
        ,DeletedBy   = pLoginId
   WHERE SessionId = pSessionId;     
END
$$
DELIMITER ;

