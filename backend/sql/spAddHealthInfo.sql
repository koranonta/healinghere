DELIMITER $$
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
DELIMITER ;

