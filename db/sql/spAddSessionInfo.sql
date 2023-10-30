DELIMITER $$
DROP PROCEDURE IF EXISTS spAddSessionInfo
$$

CREATE PROCEDURE spAddSessionInfo (
  pClientId      INT
 ,pSessionDate   DATETIME
 ,pIssue         VARCHAR(255)
 ,pResponse      TEXT
 ,pLoginId       INT
 ,OUT oSessionId INT
)
/***********************************************************
 *  Procedure: spAddSessionInfo
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
  INSERT INTO SessionInfos (ClientId, SessionDate, Issue, Response, DateCreated, DateModified, CreatedBy, ModifiedBy)
    VALUES(pClientId, pSessionDate, pIssue, pResponse, Now(), Now(), pLoginId, pLoginId);
  SET oSessionId = LAST_INSERT_ID();
END
$$
DELIMITER ;

