DELIMITER $$
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
DELIMITER ;

