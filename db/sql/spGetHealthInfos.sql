DELIMITER $$
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
DELIMITER ;

