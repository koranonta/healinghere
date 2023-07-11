DELIMITER $$
DROP PROCEDURE IF EXISTS spGetClients
$$

CREATE PROCEDURE spGetClients (
  pClientId INT
)
/***********************************************************
 *  Procedure: spGetClients
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
  SELECT ClientId      as clientid
        ,ClientName    as clientname
        ,UserName      as username
        ,EmailAddress  as emailaddress
        ,LastActive    as lastactive
        ,SignUp        as signup
        ,Orders        as orders
        ,TotalSpend    as totalspend
        ,AOV           as aov
        ,Country       as country
        ,City          as city
        ,Region        as region
        ,PostCode      as postcode
    FROM Clients
   WHERE DateDeleted IS NULL
     AND (ClientId = pClientId OR IF( pClientId <= 0, 1, 0) = 1);
END
$$
DELIMITER ;

