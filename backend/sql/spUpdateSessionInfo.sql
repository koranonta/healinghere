DELIMITER $$
DROP PROCEDURE IF EXISTS spUpdateSessionInfo
$$

CREATE PROCEDURE spUpdateSessionInfo (
  pSessionId     INT
 ,pClientId      INT
 ,pSessionDate   DATETIME
 ,pIssue         VARCHAR(255)
 ,pResponse      TEXT
 ,pLoginId       INT
)
/***********************************************************
 *  Procedure: spUpdateSessionInfo
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
  SET pLoginId = IFNULL(pLoginId, -1);
  UPDATE SessionInfos
     SET SessionId      = pSessionId
        ,ClientId       = pClientId
        ,SessionDate    = pSessionDate
        ,Issue          = pIssue
        ,Response       = pResponse
        ,DateModified   = Now()
        ,ModifiedBy     = pLoginId
   WHERE SessionId = pSessionId
     AND DateDeleted IS NULL;
END
$$
DELIMITER ;

