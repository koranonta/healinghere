DELIMITER $$
DROP PROCEDURE IF EXISTS spGetClientByName
$$

CREATE PROCEDURE spGetClientByName (
  pName VARCHAR(100)
)
/***********************************************************
 *  Procedure: spGetClientByName
 *
 *  Purpose: CALL spGetClientByName ('abc');
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
     AND (ClientName = pName OR EmailAddress = pName OR UserName = pName);
END
$$
DELIMITER ;

