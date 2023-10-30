DELIMITER $$
DROP PROCEDURE IF EXISTS spDeleteHealthInfo
$$

CREATE PROCEDURE spDeleteHealthInfo (
  pHealthInfoId INT
 ,pLoginId      INT
)
/***********************************************************
 *  Procedure: spDeleteHealthInfo
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
  UPDATE HealthInfos
     SET DateDeleted = Now()
        ,DeletedBy   = pLoginId
   WHERE HealthInfoId = pHealthInfoId;     
END
$$
DELIMITER ;

