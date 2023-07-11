DELIMITER $$
DROP PROCEDURE IF EXISTS spDeleteClient
$$

CREATE PROCEDURE spDeleteClient (
  pClientId INT
 ,pLoginId  INT
)
/***********************************************************
 *  Procedure: spDeleteClient
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
  UPDATE Clients
     SET DateDeleted = Now()
        ,DeletedBy   = pLoginId
   WHERE ClientId = pClientId;     
END
$$
DELIMITER ;

