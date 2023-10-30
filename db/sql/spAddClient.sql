DELIMITER $$
DROP PROCEDURE IF EXISTS spAddClient
$$

CREATE PROCEDURE spAddClient (
  pClientName   VARCHAR(255)
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
 ,OUT oClientId INT
)
/***********************************************************
 *  Procedure: spAddClient
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
  INSERT INTO Clients (ClientName, UserName, EmailAddress, LastActive, SignUp, Orders, TotalSpend, AOV, Country, City, Region, PostCode, DateCreated, DateModified, CreatedBy, ModifiedBy)
    VALUES(pClientName, pUserName, pEmailAddress, pLastActive, pSignUp, pOrders, pTotalSpend, pAOV, pCountry, pCity, pRegion, pPostCode, Now(), Now(), pLoginId, pLoginId);
  SET oClientId = LAST_INSERT_ID();
END
$$
DELIMITER ;

