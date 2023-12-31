DROP DATABASE IF EXISTS lapatprc_hhdb;
CREATE DATABASE lapatprc_hhdb;
USE lapatprc_hhdb;
DROP TABLE IF EXISTS Sessions;
DROP TABLE IF EXISTS HealthInfos;
DROP TABLE IF EXISTS Clients;
DROP TABLE IF EXISTS PropertyTypeGroups;
DROP TABLE IF EXISTS PropertyTypes;

CREATE TABLE PropertyTypeGroups (
  PropertyTypeGroupId       int          NOT NULL AUTO_INCREMENT,
  PropertyTypeGroupName     varchar(100) NOT NULL,
  DateCreated               datetime     NOT NULL,
  DateModified              datetime     NOT NULL,
  DateDeleted               datetime     DEFAULT NULL,
  CreatedBy                 int          NOT NULL DEFAULT '-1',
  ModifiedBy                int          NOT NULL DEFAULT '-1',
  DeletedBy                 int          DEFAULT NULL,
  PRIMARY KEY (PropertyTypeGroupId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE PropertyTypes (
  PropertyTypeId       int NOT NULL AUTO_INCREMENT,
  PropertyTypeGroupId  int NOT NULL,
  PropertyTypeName     varchar(100) NOT NULL,
  Alias                varchar(100) DEFAULT NULL,
  AllowableValues      varchar(100) DEFAULT NULL,
  ProcessAction        varchar(100) DEFAULT NULL,
  Description          varchar(500) DEFAULT NULL,
  DateCreated          datetime NOT NULL,
  DateModified         datetime NOT NULL,
  DateDeleted          datetime DEFAULT NULL,
  CreatedBy            int NOT NULL DEFAULT '-1',
  ModifiedBy           int NOT NULL DEFAULT '-1',
  DeletedBy            int DEFAULT NULL,
  PRIMARY KEY (PropertyTypeId),
  FOREIGN KEY (PropertyTypeGroupId) REFERENCES PropertyTypeGroups(PropertyTypeGroupId),
  INDEX PropertyTypesIndex (PropertyTypeId, PropertyTypeGroupId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Clients (
  ClientId int NOT NULL,
  ClientName varchar(255) NOT NULL,
  UserName varchar(100) NOT NULL,
  EmailAddress varchar(100) NOT NULL,
  LastActive datetime NOT NULL,
  SignUp datetime NOT NULL,
  Orders float NOT NULL DEFAULT 0,
  TotalSpend float NOT NULL DEFAULT 0,
  AOV float NOT NULL DEFAULT 0,
  Country varchar(100) DEFAULT NULL,
  City varchar(100) DEFAULT NULL,
  Region varchar(100) DEFAULT NULL,
  PostCode varchar(10) DEFAULT NULL,
  DateCreated datetime NOT NULL,
  DateModified datetime NOT NULL,
  DateDeleted datetime DEFAULT NULL,
  CreatedBy int(11) NOT NULL DEFAULT -1,
  ModifiedBy int(11) NOT NULL DEFAULT -1,
  DeletedBy int(11) DEFAULT NULL,
  PRIMARY KEY (ClientId),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE HealthInfos (
  HealthInfoId    INT NOT NULL AUTO_INCREMENT,
  ClientId        INT NOT NULL,
  Symptoms        VARCHAR(255) NOT NULL,
  SymptomsTr      VARCHAR(255) NOT NULL,
  NotifDiseases   VARCHAR(255) NOT NULL,
  NotifDiseasesTr VARCHAR(255) NOT NULL,
  Diabetes        VARCHAR(255) NOT NULL,
  DiabetesTr      VARCHAR(255) NOT NULL,
  Pregnancy       VARCHAR(255) NOT NULL,
  PregnancyTr     VARCHAR(255) NOT NULL,
  Allergies       VARCHAR(255) NOT NULL,
  AllergiesTr     VARCHAR(255) NOT NULL,
  MedHist         VARCHAR(255) NOT NULL,
  MedHistDet      VARCHAR(255) NOT NULL,
  CurrMed         VARCHAR(255) NOT NULL,
  CurrMedDet      VARCHAR(255) NOT NULL,
  GPName          VARCHAR(255) NOT NULL,
  GPPracticeAddr  VARCHAR(255) NOT NULL,
  DateCreated     DATETIME     NOT NULL,
  DateModified    DATETIME     NOT NULL,
  DateDeleted     DATETIME     DEFAULT NULL,
  CreatedBy       INT          NOT NULL DEFAULT -1,
  ModifiedBy      INT          NOT NULL DEFAULT -1,
  DeletedBy       INT          DEFAULT NULL,
  PRIMARY KEY (HealthInfoId),
  FOREIGN KEY (ClientId) REFERENCES Clients(ClientId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE Sessions (
  SessionId    INT          NOT NULL AUTO_INCREMENT,
  ClientId     INT          NOT NULL,
  SessionDate  DATETIME     NOT NULL,
  Issue        VARCHAR(255) DEFAULT NULL,
  Response     TEXT         DEFAULT NULL,
  DateCreated  DATETIME     NOT NULL,
  DateModified DATETIME     NOT NULL,
  DateDeleted  DATETIME     DEFAULT NULL,
  CreatedBy    INT          NOT NULL DEFAULT -1,
  ModifiedBy   INT          NOT NULL DEFAULT -1,
  DeletedBy    INT          DEFAULT NULL,
  PRIMARY KEY (SessionId),
  FOREIGN KEY (ClientId) REFERENCES Clients(ClientId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE SessionProperties (
  SessionPropertyId INT      NOT NULL AUTO_INCREMENT,
  SessionId         INT      NOT NULL,
  PropertyTypeId    INT      NOT NULL,
  PropertyValue     VARCHAR(255) NOT NULL,
  DateCreated       DATETIME NOT NULL,
  DateModified      DATETIME NOT NULL,
  DateDeleted       DATETIME DEFAULT NULL,
  CreatedBy         INT      NOT NULL DEFAULT -1,
  ModifiedBy        INT      NOT NULL DEFAULT -1,
  DeletedBy         INT      DEFAULT NULL,
  PRIMARY KEY (SessionPropertyId),
  FOREIGN KEY (SessionId) REFERENCES Sessions(SessionId)
  FOREIGN KEY (PropertyTypeId) REFERENCES PropertyTypes(PropertyTypeId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

