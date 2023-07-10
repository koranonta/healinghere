USE healinghere_co_ukhh_extension_db;
DROP TABLE IF EXISTS SessionInfos;
DROP TABLE IF EXISTS HealthInfos;
DROP TABLE IF EXISTS Clients;

CREATE TABLE Clients (
  ClientId     INT          NOT NULL AUTO_INCREMENT,
  ClientName   VARCHAR(255) NOT NULL,
  UserName     VARCHAR(100) NOT NULL,
  EmailAddress VARCHAR(100) NOT NULL,
  LastActive   DateTime     NOT NULL,
  SignUp       DateTime     NOT NULL,
  Orders       FLOAT        NOT NULL DEFAULT 0.0,
  TotalSpend   FLOAT        NOT NULL DEFAULT 0.0,
  AOV          FLOAT        NOT NULL DEFAULT 0.0,
  Country      VARCHAR(100) DEFAULT NULL,
  City         VARCHAR(100) DEFAULT NULL,
  Region       VARCHAR(100) DEFAULT NULL,
  PostCode     VARCHAR(10)  DEFAULT NULL,    
  DateCreated  DATETIME      NOT NULL,
  DateModified DATETIME      NOT NULL,
  DateDeleted  DATETIME      DEFAULT NULL,
  CreatedBy    INT           NOT NULL DEFAULT -1,
  ModifiedBy   INT           NOT NULL DEFAULT -1,
  DeletedBy    INT           DEFAULT NULL,
  PRIMARY KEY (ClientId)
);

CREATE TABLE HealthInfos (
  HealthInfoId    INT NOT NULL AUTO_INCREMENT,
  ClientId        INT NOT NULL,
  Symptoms        VARCHAR(255),
  SymptomsTr      VARCHAR(255),
  NotifDiseases   VARCHAR(255),
  NotifDiseasesTr VARCHAR(255),
  Diabetes        VARCHAR(255),
  DiabetesTr      VARCHAR(255),
  Pregnancy       VARCHAR(255),
  PregnancyTr     VARCHAR(255),
  Allergies       VARCHAR(255),
  AllergiesTr     VARCHAR(255),
  MedHist         VARCHAR(255),
  MedHistDet      VARCHAR(255),
  CurrMed         VARCHAR(255),
  CurrMedDet      VARCHAR(255),
  GPName          VARCHAR(255),
  GPPracticeAddr  VARCHAR(255),
  DateCreated     DATETIME     NOT NULL,
  DateModified    DATETIME     NOT NULL,
  DateDeleted     DATETIME     DEFAULT NULL,
  CreatedBy       INT          NOT NULL DEFAULT -1,
  ModifiedBy      INT          NOT NULL DEFAULT -1,
  DeletedBy       INT          DEFAULT NULL,
  PRIMARY KEY (HealthInfoId),
  FOREIGN KEY (ClientId) REFERENCES Clients(ClientId)
);


CREATE TABLE SessionInfos (
  SessionId       INT           NOT NULL AUTO_INCREMENT,
  ClientId        INT           NOT NULL,
  Date            DATETIME      NOT NULL,
  Issue           VARCHAR(255) DEFAULT NULL,
  Response        TEXT          DEFAULT NULL,
  DateCreated     DATETIME      NOT NULL,
  DateModified    DATETIME      NOT NULL,
  DateDeleted     DATETIME      DEFAULT NULL,
  CreatedBy       INT           NOT NULL DEFAULT -1,
  ModifiedBy      INT           NOT NULL DEFAULT -1,
  DeletedBy       INT           DEFAULT NULL,
  PRIMARY KEY (SessionId),
  FOREIGN KEY (ClientId) REFERENCES Clients(ClientId)
);
