USE healinghere_co_ukhh_extension_db;
DELIMITER $$
-- spAddClient.sql
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

-- spAddHealthInfo.sql
DROP PROCEDURE IF EXISTS spAddHealthInfo
$$

CREATE PROCEDURE spAddHealthInfo (
  pClientId         INT
 ,pSymptoms         VARCHAR(255)
 ,pSymptomsTr       VARCHAR(255)
 ,pNotifDiseases    VARCHAR(255)
 ,pNotifDiseasesTr  VARCHAR(255)
 ,pDiabetes         VARCHAR(255)
 ,pDiabetesTr       VARCHAR(255)
 ,pPregnancy        VARCHAR(255)
 ,pPregnancyTr      VARCHAR(255)
 ,pAllergies        VARCHAR(255)
 ,pAllergiesTr      VARCHAR(255)
 ,pMedHist          VARCHAR(255)
 ,pMedHistDet       VARCHAR(255)
 ,pCurrMed          VARCHAR(255)
 ,pCurrMedDet       VARCHAR(255)
 ,pGPName           VARCHAR(255)
 ,pGPPracticeAddr   VARCHAR(255)
 ,pLoginId          INT
 ,OUT oHealthInfoId INT
)
/***********************************************************
 *  Procedure: spAddHealthInfo
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
  INSERT INTO HealthInfos (ClientId, Symptoms, SymptomsTr, NotifDiseases, NotifDiseasesTr, Diabetes, DiabetesTr, Pregnancy, PregnancyTr, Allergies, AllergiesTr, MedHist, MedHistDet, CurrMed, CurrMedDet, GPName, GPPracticeAddr, DateCreated, DateModified, CreatedBy, ModifiedBy)
    VALUES(pClientId, pSymptoms, pSymptomsTr, pNotifDiseases, pNotifDiseasesTr, pDiabetes, pDiabetesTr, pPregnancy, pPregnancyTr, pAllergies, pAllergiesTr, pMedHist, pMedHistDet, pCurrMed, pCurrMedDet, pGPName, pGPPracticeAddr, Now(), Now(), pLoginId, pLoginId);
  SET oHealthInfoId = LAST_INSERT_ID();
END
$$

-- spAddSessionInfo.sql
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

-- spDeleteClient.sql
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

-- spDeleteHealthInfo.sql
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

-- spDeleteSessionInfo.sql
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

-- spGetClients.sql
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

-- spGetHealthInfos.sql
DROP PROCEDURE IF EXISTS spGetHealthInfos
$$

CREATE PROCEDURE spGetHealthInfos (
  pHealthInfoId INT
)
/***********************************************************
 *  Procedure: spGetHealthInfos
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
  SELECT HealthInfoId      as healthinfoid
        ,ClientId          as clientid
        ,Symptoms          as symptoms
        ,SymptomsTr        as symptomstr
        ,NotifDiseases     as notifdiseases
        ,NotifDiseasesTr   as notifdiseasestr
        ,Diabetes          as diabetes
        ,DiabetesTr        as diabetestr
        ,Pregnancy         as pregnancy
        ,PregnancyTr       as pregnancytr
        ,Allergies         as allergies
        ,AllergiesTr       as allergiestr
        ,MedHist           as medhist
        ,MedHistDet        as medhistdet
        ,CurrMed           as currmed
        ,CurrMedDet        as currmeddet
        ,GPName            as gpname
        ,GPPracticeAddr    as gppracticeaddr
    FROM HealthInfos
   WHERE DateDeleted IS NULL
     AND (HealthInfoId = pHealthInfoId OR IF( pHealthInfoId <= 0, 1, 0) = 1);
END
$$

-- spGetSessionInfos.sql
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

-- spUpdateClient.sql
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

-- spUpdateHealthInfo.sql
DROP PROCEDURE IF EXISTS spUpdateHealthInfo
$$

CREATE PROCEDURE spUpdateHealthInfo (
  pHealthInfoId     INT
 ,pClientId         INT
 ,pSymptoms         VARCHAR(255)
 ,pSymptomsTr       VARCHAR(255)
 ,pNotifDiseases    VARCHAR(255)
 ,pNotifDiseasesTr  VARCHAR(255)
 ,pDiabetes         VARCHAR(255)
 ,pDiabetesTr       VARCHAR(255)
 ,pPregnancy        VARCHAR(255)
 ,pPregnancyTr      VARCHAR(255)
 ,pAllergies        VARCHAR(255)
 ,pAllergiesTr      VARCHAR(255)
 ,pMedHist          VARCHAR(255)
 ,pMedHistDet       VARCHAR(255)
 ,pCurrMed          VARCHAR(255)
 ,pCurrMedDet       VARCHAR(255)
 ,pGPName           VARCHAR(255)
 ,pGPPracticeAddr   VARCHAR(255)
 ,pLoginId          INT
)
/***********************************************************
 *  Procedure: spUpdateHealthInfo
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
  UPDATE HealthInfos
     SET HealthInfoId      = pHealthInfoId
        ,ClientId          = pClientId
        ,Symptoms          = pSymptoms
        ,SymptomsTr        = pSymptomsTr
        ,NotifDiseases     = pNotifDiseases
        ,NotifDiseasesTr   = pNotifDiseasesTr
        ,Diabetes          = pDiabetes
        ,DiabetesTr        = pDiabetesTr
        ,Pregnancy         = pPregnancy
        ,PregnancyTr       = pPregnancyTr
        ,Allergies         = pAllergies
        ,AllergiesTr       = pAllergiesTr
        ,MedHist           = pMedHist
        ,MedHistDet        = pMedHistDet
        ,CurrMed           = pCurrMed
        ,CurrMedDet        = pCurrMedDet
        ,GPName            = pGPName
        ,GPPracticeAddr    = pGPPracticeAddr
        ,DateModified      = Now()
        ,ModifiedBy        = pLoginId
   WHERE HealthInfoId = pHealthInfoId
     AND DateDeleted IS NULL;
END
$$

-- spUpdateSessionInfo.sql
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

DROP PROCEDURE IF EXISTS spGetClientByName
$$

CREATE PROCEDURE spGetClientByName (
  pName VARCHAR(100)
)
/***********************************************************
 *  Procedure: spGetClientByName
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
     AND (UserName = pName OR EmailAddress = pName);
END
$$

DELIMITER ;
