DELIMITER $$
DROP PROCEDURE IF EXISTS spUpdateClient
$$

CREATE PROCEDURE spUpdateClient (
  pClientId     INT
 ,pClientName   VARCHAR(255)
 ,pUserName     VARCHAR(100)
 ,pEmailAddress VARCHAR(100)
 ,pLastActive   DateTime
 ,pSignUp       DateTime
 ,pOrders       FLOAT
 ,pTotalSpend   FLOAT
 ,pAOV          FLOAT
 ,pCountry      VARCHAR(100)
 ,pCity         VARCHAR(100)
 ,pRegion       VARCHAR(100)
 ,pPostCode     VARCHAR(10)
 ,pLoginId      INT
)
/***********************************************************
 *  Procedure: spUpdateClient
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
  UPDATE Clients
     SET ClientId      = pClientId
        ,ClientName    = pClientName
        ,UserName      = pUserName
        ,EmailAddress  = pEmailAddress
        ,LastActive    = pLastActive
        ,SignUp        = pSignUp
        ,Orders        = pOrders
        ,TotalSpend    = pTotalSpend
        ,AOV           = pAOV
        ,Country       = pCountry
        ,City          = pCity
        ,Region        = pRegion
        ,PostCode      = pPostCode
        ,DateModified  = Now()
        ,ModifiedBy    = pLoginId
   WHERE ClientId = pClientId
     AND DateDeleted IS NULL;
END
$$
DELIMITER ;

