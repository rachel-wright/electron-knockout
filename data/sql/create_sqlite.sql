/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases V9.2.0                     */
/* Target DBMS:           SQLite 3                                        */
/* Project file:          rct-datamodel.dez                               */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Database creation script                        */
/* Created on:            2017-02-28 13:11                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Add tables                                                             */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Add table "country"                                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE "country" (
    "countryId" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    CONSTRAINT "PK_country" PRIMARY KEY ("countryId")
);

/* ---------------------------------------------------------------------- */
/* Add table "state"                                                      */
/* ---------------------------------------------------------------------- */

CREATE TABLE "state" (
    "stateId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "stateName" TEXT NOT NULL,
    CONSTRAINT "PK_state" PRIMARY KEY ("stateId"),
    FOREIGN KEY ("countryId") REFERENCES "country" ("countryId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "county"                                                     */
/* ---------------------------------------------------------------------- */

CREATE TABLE "county" (
    "countyId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "countyName" TEXT NOT NULL,
    CONSTRAINT "PK_county" PRIMARY KEY ("countyId"),
    FOREIGN KEY ("stateId") REFERENCES "state" ("stateId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "city"                                                       */
/* ---------------------------------------------------------------------- */

CREATE TABLE "city" (
    "cityId" TEXT NOT NULL,
    "countyId" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    CONSTRAINT "PK_city" PRIMARY KEY ("cityId"),
    FOREIGN KEY ("countyId") REFERENCES "county" ("countyId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "ethnicity"                                                  */
/* ---------------------------------------------------------------------- */

CREATE TABLE "ethnicity" (
    "ethnicityCode" TEXT NOT NULL,
    "ethnicityAbbreviation" TEXT NOT NULL,
    "ethnicityShortName" TEXT NOT NULL,
    "ethnicityLongName" TEXT NOT NULL,
    CONSTRAINT "PK_ethnicity" PRIMARY KEY ("ethnicityCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "recruitingSource"                                           */
/* ---------------------------------------------------------------------- */

CREATE TABLE "recruitingSource" (
    "recruitingSourceCode" TEXT,
    "recruitingSourceName" TEXT NOT NULL,
    "candidateType" TEXT,
    "isActive" INTEGER NOT NULL,
    CONSTRAINT "PK_recruitingSource" PRIMARY KEY ("recruitingSourceCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "commentType"                                                */
/* ---------------------------------------------------------------------- */

CREATE TABLE "commentType" (
    "commentTypeId" TEXT NOT NULL,
    "commentTypeCode" TEXT,
    "commentTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_commentType" PRIMARY KEY ("commentTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "benefit"                                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE "benefit" (
    "benefitId" TEXT NOT NULL,
    "benefitDescription" TEXT NOT NULL,
    CONSTRAINT "PK_benefit" PRIMARY KEY ("benefitId")
);

/* ---------------------------------------------------------------------- */
/* Add table "event"                                                      */
/* ---------------------------------------------------------------------- */

CREATE TABLE "event" (
    "eventId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "visibilityId" TEXT NOT NULL,
    "eventOwnerId" TEXT NOT NULL,
    "eventLocation" TEXT,
    "eventStartDateTime" TEXT,
    "eventEndDateTime" TEXT,
    "eventCompleted" TEXT,
    "eventComments" TEXT,
    "lastUpdated" TEXT,
    CONSTRAINT "PK_event" PRIMARY KEY ("eventId")
);

/* ---------------------------------------------------------------------- */
/* Add table "religion"                                                   */
/* ---------------------------------------------------------------------- */

CREATE TABLE "religion" (
    "religionCode" TEXT NOT NULL,
    "religionName" TEXT NOT NULL,
    CONSTRAINT "PK_religion" PRIMARY KEY ("religionCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "mepcomRace"                                                 */
/* ---------------------------------------------------------------------- */

CREATE TABLE "mepcomRace" (
    "mepcomRaceCode" TEXT NOT NULL,
    "mepcomRaceName" TEXT NOT NULL,
    CONSTRAINT "PK_mepcomRace" PRIMARY KEY ("mepcomRaceCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "mepcomEthnicity"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "mepcomEthnicity" (
    "mepcomEthnicityCode" TEXT NOT NULL,
    "mepcomEthnicityName" TEXT NOT NULL,
    "isActive" INTEGER NOT NULL,
    CONSTRAINT "PK_mepcomEthnicity" PRIMARY KEY ("mepcomEthnicityCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "citizenshipType"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "citizenshipType" (
    "citizenshipTypeCode" TEXT NOT NULL,
    "citizenshipTypeName" TEXT NOT NULL,
    "candidateType" TEXT NOT NULL,
    CONSTRAINT "PK_citizenshipType" PRIMARY KEY ("citizenshipTypeCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "drugType"                                                   */
/* ---------------------------------------------------------------------- */

CREATE TABLE "drugType" (
    "drugTypeId" INTEGER NOT NULL,
    "drugTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_drugType" PRIMARY KEY ("drugTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "dependentType"                                              */
/* ---------------------------------------------------------------------- */

CREATE TABLE "dependentType" (
    "dependentTypeCode" TEXT,
    "dependentTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_dependentType" PRIMARY KEY ("dependentTypeCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "offenseType"                                                */
/* ---------------------------------------------------------------------- */

CREATE TABLE "offenseType" (
    "offenseTypeId" INTEGER NOT NULL,
    "offenseTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_offenseType" PRIMARY KEY ("offenseTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "eventSourceType"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "eventSourceType" (
    "eventSourceTypeId" TEXT NOT NULL,
    "eventSourceTypeName" TEXT,
    CONSTRAINT "PK_eventSourceType" PRIMARY KEY ("eventSourceTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "deleteHistory"                                              */
/* ---------------------------------------------------------------------- */

CREATE TABLE "deleteHistory" (
    "tableName" TEXT NOT NULL,
    "primaryKey" TEXT NOT NULL,
    PRIMARY KEY ("tableName", "primaryKey")
);

/* ---------------------------------------------------------------------- */
/* Add table "appSetting"                                                 */
/* ---------------------------------------------------------------------- */

CREATE TABLE "appSetting" (
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "PK_appSetting" PRIMARY KEY ("name")
);

/* ---------------------------------------------------------------------- */
/* Add table "recruitingActivity"                                         */
/* ---------------------------------------------------------------------- */

CREATE TABLE "recruitingActivity" (
    "recruitingActivityCode" TEXT,
    "recruitingActivityName" TEXT NOT NULL,
    "candidateType" TEXT,
    CONSTRAINT "PK_recruitingActivity" PRIMARY KEY ("recruitingActivityCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "race"                                                       */
/* ---------------------------------------------------------------------- */

CREATE TABLE "race" (
    "raceCode" TEXT NOT NULL,
    "raceName" TEXT NOT NULL,
    CONSTRAINT "PK_race" PRIMARY KEY ("raceCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "serviceCharacter"                                           */
/* ---------------------------------------------------------------------- */

CREATE TABLE "serviceCharacter" (
    "serviceCharacterCode" TEXT NOT NULL,
    "serviceCharacterShortName" TEXT NOT NULL,
    "serviceCharacterLongName" TEXT NOT NULL,
    CONSTRAINT "PK_serviceCharacter" PRIMARY KEY ("serviceCharacterCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "service"                                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE "service" (
    "serviceId" INTEGER NOT NULL,
    "serviceCode" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    CONSTRAINT "PK_service" PRIMARY KEY ("serviceId")
);

/* ---------------------------------------------------------------------- */
/* Add table "reenlistment"                                               */
/* ---------------------------------------------------------------------- */

CREATE TABLE "reenlistment" (
    "reenlistmentCode" TEXT NOT NULL,
    "reenlistmentName" TEXT NOT NULL,
    CONSTRAINT "PK_reenlistment" PRIMARY KEY ("reenlistmentCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "separation"                                                 */
/* ---------------------------------------------------------------------- */

CREATE TABLE "separation" (
    "separationCode" TEXT NOT NULL,
    "separationName" TEXT NOT NULL,
    "separationType" TEXT,
    "candidateType" TEXT,
    CONSTRAINT "PK_separation" PRIMARY KEY ("separationCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "heightWeightStandard"                                       */
/* ---------------------------------------------------------------------- */

CREATE TABLE "heightWeightStandard" (
    "heightWeightStandardId" INTEGER,
    "genderCode" TEXT,
    "height" INTEGER,
    "minDepWgt" INTEGER,
    "maxDepWgtUnder21" INTEGER,
    "maxDepWgtUnder31" INTEGER,
    "maxDepWgtUnder36" INTEGER,
    "maxShipWgt" INTEGER,
    "shipWgtOver5Pct" INTEGER,
    "shipWgtOver10Pct" INTEGER,
    "priSrvMinDepWgt" INTEGER,
    "priSrvMaxDepWgt" INTEGER
);

/* ---------------------------------------------------------------------- */
/* Add table "emailType"                                                  */
/* ---------------------------------------------------------------------- */

CREATE TABLE "emailType" (
    "emailTypeId" INTEGER NOT NULL,
    "emailTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_emailType" PRIMARY KEY ("emailTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "phoneType"                                                  */
/* ---------------------------------------------------------------------- */

CREATE TABLE "phoneType" (
    "phoneTypeId" TEXT NOT NULL,
    "phoneTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_phoneType" PRIMARY KEY ("phoneTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "gender"                                                     */
/* ---------------------------------------------------------------------- */

CREATE TABLE "gender" (
    "genderCode" TEXT NOT NULL,
    "genderName" TEXT NOT NULL,
    CONSTRAINT "PK_gender" PRIMARY KEY ("genderCode")
);
INSERT INTO gender VALUES("M", "Male");
INSERT INTO gender VALUES("F", "Female");
INSERT INTO gender VALUES("U", "Undisclosed");

/* ---------------------------------------------------------------------- */
/* Add table "educationLevel"                                             */
/* ---------------------------------------------------------------------- */

CREATE TABLE "educationLevel" (
    "educationLevelCode" TEXT,
    "educationLevelName" TEXT NOT NULL,
    CONSTRAINT "PK_educationLevel" PRIMARY KEY ("educationLevelCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "educationCertification"                                     */
/* ---------------------------------------------------------------------- */

CREATE TABLE "educationCertification" (
    "educationCertificationCode" TEXT,
    "educationCertificationName" TEXT NOT NULL,
    CONSTRAINT "PK_educationCertification" PRIMARY KEY ("educationCertificationCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "educationCredential"                                        */
/* ---------------------------------------------------------------------- */

CREATE TABLE "educationCredential" (
    "educationCredentialCode" TEXT,
    "educationCredentialName" TEXT,
    CONSTRAINT "PK_educationCredential" PRIMARY KEY ("educationCredentialCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "educationStatus"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "educationStatus" (
    "educationStatusCode" TEXT,
    "educationStatusName" TEXT NOT NULL,
    CONSTRAINT "PK_educationStatus" PRIMARY KEY ("educationStatusCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "educationProjectedTier"                                     */
/* ---------------------------------------------------------------------- */

CREATE TABLE "educationProjectedTier" (
    "educationProjectedTierId" TEXT NOT NULL,
    "educationProjectedTierName" TEXT NOT NULL,
    CONSTRAINT "PK_educationProjectedTier" PRIMARY KEY ("educationProjectedTierId")
);

/* ---------------------------------------------------------------------- */
/* Add table "addressType"                                                */
/* ---------------------------------------------------------------------- */

CREATE TABLE "addressType" (
    "addressTypeId" INTEGER NOT NULL,
    "addressTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_addressType" PRIMARY KEY ("addressTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "priority"                                                   */
/* ---------------------------------------------------------------------- */

CREATE TABLE "priority" (
    "priorityCode" INTEGER NOT NULL,
    "priorityName" TEXT NOT NULL,
    CONSTRAINT "PK_priority" PRIMARY KEY ("priorityCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "initialContactIndicator"                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE "initialContactIndicator" (
    "initialContactIndicatorId" TEXT NOT NULL,
    "initialContactIndictorDescription" TEXT NOT NULL,
    CONSTRAINT "PK_initialContactIndicator" PRIMARY KEY ("initialContactIndicatorId")
);

/* ---------------------------------------------------------------------- */
/* Add table "highSchoolOpt"                                              */
/* ---------------------------------------------------------------------- */

CREATE TABLE "highSchoolOpt" (
    "highSchoolOptId" TEXT NOT NULL,
    "highSchoolOptDescription" TEXT NOT NULL,
    CONSTRAINT "PK_highSchoolOpt" PRIMARY KEY ("highSchoolOptId")
);

/* ---------------------------------------------------------------------- */
/* Add table "dualSource"                                                 */
/* ---------------------------------------------------------------------- */

CREATE TABLE "dualSource" (
    "dualSourceId" TEXT NOT NULL,
    "dualSourceName" TEXT NOT NULL,
    CONSTRAINT "PK_dualSource" PRIMARY KEY ("dualSourceId")
);

/* ---------------------------------------------------------------------- */
/* Add table "prospectCategory"                                           */
/* ---------------------------------------------------------------------- */

CREATE TABLE "prospectCategory" (
    "prospectCategoryId" TEXT NOT NULL,
    "prospectCategoryDescription" TEXT NOT NULL,
    CONSTRAINT "PK_prospectCategory" PRIMARY KEY ("prospectCategoryId")
);

/* ---------------------------------------------------------------------- */
/* Add table "birthVerification"                                          */
/* ---------------------------------------------------------------------- */

CREATE TABLE "birthVerification" (
    "birthVerificationCode" INTEGER NOT NULL,
    "birthVerificationName" TEXT NOT NULL,
    CONSTRAINT "PK_birthVerification" PRIMARY KEY ("birthVerificationCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "adverseAdjudication"                                        */
/* ---------------------------------------------------------------------- */

CREATE TABLE "adverseAdjudication" (
    "adverseAdjudicationId" INTEGER NOT NULL,
    "adverseAdjudicationName" TEXT NOT NULL,
    CONSTRAINT "PK_adverseAdjudication" PRIMARY KEY ("adverseAdjudicationId")
);
INSERT INTO adverseAdjudication VALUES (0, 'Guilty');
INSERT INTO adverseAdjudication VALUES (1, 'Other');

/* ---------------------------------------------------------------------- */
/* Add table "offenseSummary"                                             */
/* ---------------------------------------------------------------------- */

CREATE TABLE "offenseSummary" (
    "offenseSummaryId" TEXT NOT NULL,
    "offenseSummaryDescription" TEXT NOT NULL,
    CONSTRAINT "PK_offenseSummary" PRIMARY KEY ("offenseSummaryId")
);

/* ---------------------------------------------------------------------- */
/* Add table "examType"                                                   */
/* ---------------------------------------------------------------------- */

CREATE TABLE "examType" (
    "examTypeId" TEXT NOT NULL,
    "examTypeName" TEXT NOT NULL,
    CONSTRAINT "PK_examType" PRIMARY KEY ("examTypeId")
);

/* ---------------------------------------------------------------------- */
/* Add table "careerDecision"                                             */
/* ---------------------------------------------------------------------- */

CREATE TABLE "careerDecision" (
    "careerDecisionId" TEXT NOT NULL,
    "careerDecisionName" TEXT NOT NULL,
    CONSTRAINT "PK_careerDecision" PRIMARY KEY ("careerDecisionId")
);

/* ---------------------------------------------------------------------- */
/* Add table "dependentRecordStatus"                                      */
/* ---------------------------------------------------------------------- */

CREATE TABLE "dependentRecordStatus" (
    "dependentRecordStatusId" TEXT NOT NULL,
    "dependentRecordStatusDescription" TEXT NOT NULL,
    CONSTRAINT "PK_dependentRecordStatus" PRIMARY KEY ("dependentRecordStatusId")
);

/* ---------------------------------------------------------------------- */
/* Add table "verificationStatus"                                         */
/* ---------------------------------------------------------------------- */

CREATE TABLE "verificationStatus" (
    "verificationStatusCode" INTEGER NOT NULL,
    "verificationStatusName" TEXT NOT NULL,
    CONSTRAINT "PK_verificationStatus" PRIMARY KEY ("verificationStatusCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "schoolType"                                                 */
/* ---------------------------------------------------------------------- */

CREATE TABLE "schoolType" (
    "schoolTypeCode" TEXT,
    "schoolTypeName" TEXT,
    CONSTRAINT "PK_schoolType" PRIMARY KEY ("schoolTypeCode")
);

/* ---------------------------------------------------------------------- */
/* Add table "dependentAddress"                                           */
/* ---------------------------------------------------------------------- */

CREATE TABLE "dependentAddress" (
    "dependentAddressId" TEXT NOT NULL,
    "street1" TEXT,
    "street2" TEXT,
    "cityId" TEXT,
    CONSTRAINT "PK_dependentAddress" PRIMARY KEY ("dependentAddressId")
);

/* ---------------------------------------------------------------------- */
/* Add table "candidateDisposition"                                       */
/* ---------------------------------------------------------------------- */

CREATE TABLE "candidateDisposition" (
    "candidateDispositionCode" TEXT,
    "candidateDispositionName" TEXT,
    "candidateDispositionStatusCode" TEXT,
    "candidateDispositionStatusName" TEXT,
    "candidateType" TEXT,
    CONSTRAINT "PK_candidateDisposition" PRIMARY KEY ("candidateDispositionCode")
);
INSERT INTO candidateDisposition VALUES ("DH", "Dep & Hold", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("F", "Working", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("FR", "DQ - Fraud", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("G", "DQ - Medical", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("H", "DQ - Mental", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("I", "DQ - Moral", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("J", "DQ - Other", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("PA", "Pending Approval", "A", "NWA", "E");
INSERT INTO candidateDisposition VALUES ("K", "Poolee", "B", "Contract", "E");
INSERT INTO candidateDisposition VALUES ("L", "Dep Discharge", "B", "Contract", "E");
INSERT INTO candidateDisposition VALUES ("M", "Pending Discharge", "B", "Contract", "E");
INSERT INTO candidateDisposition VALUES ("N", "Recruit", "C", "Shipper", "E");
INSERT INTO candidateDisposition VALUES ("O", "MCRD Discharge", "C", "Shipper", "E");
INSERT INTO candidateDisposition VALUES ("P", "Graduate", "C", "Shipper", "E");
INSERT INTO candidateDisposition VALUES ("1", "Lead", "P", "Prospect", "E");
INSERT INTO candidateDisposition VALUES ("2", "PAC", "P", "Prospect", "E");
INSERT INTO candidateDisposition VALUES ("3", "Temp DQ", "P", "Prospect", "E");
INSERT INTO candidateDisposition VALUES ("4", "Perm DQ", "P", "Prospect", "E");

/* ---------------------------------------------------------------------- */
/* Add table "person"                                                     */
/* ---------------------------------------------------------------------- */

CREATE TABLE "person" (
    "personId" TEXT NOT NULL,
    "citizenshipCountryId" TEXT,
    "citizenshipTypeCode" TEXT,
    "secondCitizenshipCountryId" TEXT,
    "pobCityId" TEXT,
    "licenseStateId" TEXT,
    "religionCode" TEXT,
    "ethnicityCode" TEXT,
    "mepcomEthnicityCode" TEXT,
    "genderCode" TEXT,
    "raceCode" TEXT,
    "mepcomRaceCode" TEXT,
    "birthVerificationCode" INTEGER,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "suffix" TEXT,
    "digitalCommunication" TEXT,
    "nwaId" TEXT,
    "sector" TEXT,
    "dateOfBirth" TEXT,
    "pcReceived" INTEGER,
    "alienRegistrationNumber" TEXT,
    "hasSocialSecurityCard" INTEGER,
    "socialSecurityNumber" TEXT,
    "hasLicense" INTEGER,
    "licenseExpirationDate" TEXT,
    "licenseNumber" TEXT,
    "hasDrugUse" INTEGER,
    "hasMoralOffense" INTEGER,
    "hasPhysicalProblem" INTEGER,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_person" PRIMARY KEY ("personId"),
    FOREIGN KEY ("citizenshipCountryId") REFERENCES "country" ("countryId") ,
    FOREIGN KEY ("pobCityId") REFERENCES "city" ("cityId") ,
    FOREIGN KEY ("licenseStateId") REFERENCES "state" ("stateId") ,
    FOREIGN KEY ("citizenshipTypeCode") REFERENCES "citizenshipType" ("citizenshipTypeCode")  ON DELETE RESTRICT,
    FOREIGN KEY ("religionCode") REFERENCES "religion" ("religionCode")  ON DELETE RESTRICT,
    FOREIGN KEY ("ethnicityCode") REFERENCES "ethnicity" ("ethnicityCode") ,
    FOREIGN KEY ("mepcomEthnicityCode") REFERENCES "mepcomEthnicity" ("mepcomEthnicityCode") ,
    FOREIGN KEY ("raceCode") REFERENCES "race" ("raceCode") ,
    FOREIGN KEY ("mepcomRaceCode") REFERENCES "mepcomRace" ("mepcomRaceCode") ,
    FOREIGN KEY ("genderCode") REFERENCES "gender" ("genderCode") ,
    FOREIGN KEY ("secondCitizenshipCountryId") REFERENCES "country" ("countryId") ,
    FOREIGN KEY ("birthVerificationCode") REFERENCES "birthVerification" ("birthVerificationCode") 
);

/* ---------------------------------------------------------------------- */
/* Add table "prospect"                                                   */
/* ---------------------------------------------------------------------- */

CREATE TABLE "prospect" (
    "prospectId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "recruitingSourceCode" TEXT,
    "candidateDispositionCode" TEXT,
    "priorityId" TEXT,
    "initialContactIndicatorId" TEXT,
    "highSchoolOptId" TEXT,
    "dualSourceId" TEXT,
    "prospectCategoryId" TEXT,
    "datePrepared" TEXT,
    "eppcControlNumber" TEXT,
    "referrerEdipiSsn" TEXT,
    "monthWorkingFor" TEXT,
    "programType" TEXT,
    "program" TEXT,
    "referToOsoDate" TEXT,
    "interest" TEXT,
    "additionalInformation" TEXT,
    "dateDeclared" TEXT,
    "dateStartedWorking" TEXT,
    "tdqNote" TEXT,
    "expirationDate" TEXT,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_prospect" PRIMARY KEY ("prospectId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE,
    FOREIGN KEY ("recruitingSourceCode") REFERENCES "recruitingSource" ("recruitingSourceCode") ,
    FOREIGN KEY ("priorityId") REFERENCES "priority" ("priorityCode") ,
    FOREIGN KEY ("initialContactIndicatorId") REFERENCES "initialContactIndicator" ("initialContactIndicatorId") ,
    FOREIGN KEY ("highSchoolOptId") REFERENCES "highSchoolOpt" ("highSchoolOptId") ,
    FOREIGN KEY ("dualSourceId") REFERENCES "dualSource" ("dualSourceId") ,
    FOREIGN KEY ("prospectCategoryId") REFERENCES "prospectCategory" ("prospectCategoryId") ,
    FOREIGN KEY ("candidateDispositionCode") REFERENCES "candidateDisposition" ("candidateDispositionCode") 
);

/* ---------------------------------------------------------------------- */
/* Add table "address"                                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE "address" (
    "addressId" TEXT NOT NULL,
    "personId" TEXT,
    "addressTypeId" INTEGER,
    "cityId" TEXT,
    "street1" TEXT,
    "street2" TEXT,
    "zipCode" TEXT,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_address" PRIMARY KEY ("addressId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE,
    FOREIGN KEY ("addressTypeId") REFERENCES "addressType" ("addressTypeId") ,
    FOREIGN KEY ("cityId") REFERENCES "city" ("cityId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "drugUse"                                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE "drugUse" (
    "drugUseId" TEXT NOT NULL,
    "personId" TEXT,
    "drugTypeId" INTEGER NOT NULL,
    "otherDrugType" TEXT,
    "dateLastUsed" TEXT,
    "dateFirstUsed" TEXT,
    "timesUsed" INTEGER,
    "details" TEXT,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_drugUse" PRIMARY KEY ("drugUseId"),
    FOREIGN KEY ("drugTypeId") REFERENCES "drugType" ("drugTypeId")  ON DELETE RESTRICT,
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE
);

/* ---------------------------------------------------------------------- */
/* Add table "offense"                                                    */
/* ---------------------------------------------------------------------- */

CREATE TABLE "offense" (
    "offenseId" INTEGER NOT NULL,
    "offenseTypeId" INTEGER NOT NULL,
    "offenseName" TEXT NOT NULL,
    CONSTRAINT "PK_offense" PRIMARY KEY ("offenseId"),
    FOREIGN KEY ("offenseTypeId") REFERENCES "offenseType" ("offenseTypeId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "exam"                                                       */
/* ---------------------------------------------------------------------- */

CREATE TABLE "exam" (
    "examId" TEXT NOT NULL,
    "personId" TEXT,
    "examTypeId" TEXT NOT NULL,
    "careerDecisionId" TEXT,
    "examDate" TEXT NOT NULL,
    "examScore" INTEGER NOT NULL,
    "examEnteredDate" TEXT NOT NULL,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_exam" PRIMARY KEY ("examId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE,
    FOREIGN KEY ("examTypeId") REFERENCES "examType" ("examTypeId") ,
    FOREIGN KEY ("careerDecisionId") REFERENCES "careerDecision" ("careerDecisionId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "dependent"                                                  */
/* ---------------------------------------------------------------------- */

CREATE TABLE "dependent" (
    "dependentId" TEXT NOT NULL,
    "personId" TEXT,
    "dependentTypeCode" TEXT,
    "cityId" TEXT,
    "dependetRecordStatusId" TEXT,
    "verificationStatusCode" INTEGER,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "suffix" TEXT,
    "street1" TEXT NOT NULL,
    "zipCode" TEXT,
    "dateOfBirth" TEXT NOT NULL,
    "otherRelationship" TEXT,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_dependent" PRIMARY KEY ("dependentId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE,
    FOREIGN KEY ("dependentTypeCode") REFERENCES "dependentType" ("dependentTypeCode") ,
    FOREIGN KEY ("cityId") REFERENCES "city" ("cityId") ,
    FOREIGN KEY ("dependetRecordStatusId") REFERENCES "dependentRecordStatus" ("dependentRecordStatusId") ,
    FOREIGN KEY ("verificationStatusCode") REFERENCES "verificationStatus" ("verificationStatusCode") 
);

/* ---------------------------------------------------------------------- */
/* Add table "priorService"                                               */
/* ---------------------------------------------------------------------- */

CREATE TABLE "priorService" (
    "priorServiceId" TEXT NOT NULL,
    "personId" TEXT,
    "reenlistmentCode" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "separationCode" TEXT NOT NULL,
    "serviceCharacterCode" TEXT NOT NULL,
    "verificationStatusCode" INTEGER,
    "activeDutyStartDate" TEXT NOT NULL,
    "activeDutyEndDate" TEXT NOT NULL,
    "endOfObligatedServiceDate" TEXT NOT NULL,
    "currentlyInReserves" INTEGER NOT NULL,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_priorService" PRIMARY KEY ("priorServiceId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE,
    FOREIGN KEY ("serviceId") REFERENCES "service" ("serviceId") ,
    FOREIGN KEY ("reenlistmentCode") REFERENCES "reenlistment" ("reenlistmentCode") ,
    FOREIGN KEY ("separationCode") REFERENCES "separation" ("separationCode") ,
    FOREIGN KEY ("serviceCharacterCode") REFERENCES "serviceCharacter" ("serviceCharacterCode") ,
    FOREIGN KEY ("verificationStatusCode") REFERENCES "verificationStatus" ("verificationStatusCode") 
);

/* ---------------------------------------------------------------------- */
/* Add table "physicalProblem"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "physicalProblem" (
    "physicalProblemsId" TEXT NOT NULL,
    "personId" TEXT,
    "implants" TEXT,
    "contacts" TEXT,
    "operations" TEXT,
    "medicines" TEXT,
    "brokenBones" TEXT,
    "asthma" TEXT,
    "tattoos" TEXT,
    "vision" TEXT,
    "other" TEXT,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_physicalProblem" PRIMARY KEY ("physicalProblemsId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE
);

/* ---------------------------------------------------------------------- */
/* Add table "eventSource"                                                */
/* ---------------------------------------------------------------------- */

CREATE TABLE "eventSource" (
    "eventSourceId" TEXT NOT NULL,
    "eventSourceTypeId" TEXT,
    "eventSourceName" TEXT,
    "isCard" INTEGER,
    CONSTRAINT "PK_eventSource" PRIMARY KEY ("eventSourceId"),
    FOREIGN KEY ("eventSourceTypeId") REFERENCES "eventSourceType" ("eventSourceTypeId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "activityComment"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "activityComment" (
    "activityCommentId" TEXT,
    "recruitingActivityCode" TEXT,
    "commentTypeId" TEXT,
    "sortOrder" INTEGER,
    CONSTRAINT "PK_activityComment" PRIMARY KEY ("activityCommentId"),
    FOREIGN KEY ("commentTypeId") REFERENCES "commentType" ("commentTypeId")  ON DELETE RESTRICT,
    FOREIGN KEY ("recruitingActivityCode") REFERENCES "recruitingActivity" ("recruitingActivityCode")  ON DELETE RESTRICT
);

/* ---------------------------------------------------------------------- */
/* Add table "email"                                                      */
/* ---------------------------------------------------------------------- */

CREATE TABLE "email" (
    "emailId" TEXT NOT NULL,
    "personId" TEXT,
    "emailTypeId" INTEGER NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_email" PRIMARY KEY ("emailId"),
    FOREIGN KEY ("emailTypeId") REFERENCES "emailType" ("emailTypeId") ,
    FOREIGN KEY ("personId") REFERENCES "person" ("personId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "phone"                                                      */
/* ---------------------------------------------------------------------- */

CREATE TABLE "phone" (
    "phoneId" TEXT NOT NULL,
    "personId" TEXT,
    "phoneTypeId" INTEGER NOT NULL,
    "phoneNumber" TEXT,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_phone" PRIMARY KEY ("phoneId"),
    FOREIGN KEY ("phoneTypeId") REFERENCES "phoneType" ("phoneTypeId") ,
    FOREIGN KEY ("personId") REFERENCES "person" ("personId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "school"                                                     */
/* ---------------------------------------------------------------------- */

CREATE TABLE "school" (
    "schoolId" TEXT,
    "schoolTypeCode" TEXT,
    "organizationId" TEXT,
    "dodCode" TEXT,
    "schoolName" TEXT,
    "street1" TEXT,
    "street2" TEXT,
    "city" TEXT,
    "stateCode" TEXT,
    "zipCode" TEXT,
    "telephoneNumber" TEXT,
    "isActive" INTEGER NOT NULL,
    CONSTRAINT "PK_school" PRIMARY KEY ("schoolId"),
    FOREIGN KEY ("schoolTypeCode") REFERENCES "schoolType" ("schoolTypeCode") 
);

/* ---------------------------------------------------------------------- */
/* Add table "heightWeightIst"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "heightWeightIst" (
    "heightWeightIstId" TEXT NOT NULL,
    "personId" TEXT,
    "date" TEXT NOT NULL,
    "height" TEXT,
    "weight" INTEGER NOT NULL,
    "runTime" INTEGER,
    "pullUps" INTEGER,
    "flexArmHang" INTEGER,
    "crunches" INTEGER,
    "ammoCanLift" INTEGER,
    "syncState" INTEGER,
    CONSTRAINT "PK_heightWeightIst" PRIMARY KEY ("heightWeightIstId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "prospectComment"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE "prospectComment" (
    "prospectCommentId" TEXT,
    "prospectId" TEXT NOT NULL,
    "activityCommentId" TEXT,
    "commentText" TEXT,
    "commentDateTime" TEXT NOT NULL,
    "resultDateTime" TEXT,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_prospectComment" PRIMARY KEY ("prospectCommentId"),
    FOREIGN KEY ("prospectId") REFERENCES "prospect" ("prospectId")  ON DELETE CASCADE,
    FOREIGN KEY ("activityCommentId") REFERENCES "activityComment" ("activityCommentId")  ON DELETE RESTRICT
);

/* ---------------------------------------------------------------------- */
/* Add table "moralOffense"                                               */
/* ---------------------------------------------------------------------- */

CREATE TABLE "moralOffense" (
    "moralOffenseId" TEXT NOT NULL,
    "personId" TEXT,
    "cityId" TEXT NOT NULL,
    "offenseId" INTEGER NOT NULL,
    "adverseAdjudicationId" INTEGER,
    "offenseSummaryId" INTEGER,
    "offenseDate" TEXT NOT NULL,
    "zip" TEXT,
    "disposition" TEXT,
    "details" TEXT,
    "waiverCode" INTEGER,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_moralOffense" PRIMARY KEY ("moralOffenseId"),
    FOREIGN KEY ("personId") REFERENCES "person" ("personId")  ON DELETE CASCADE,
    FOREIGN KEY ("cityId") REFERENCES "city" ("cityId") ,
    FOREIGN KEY ("offenseId") REFERENCES "offense" ("offenseId") ,
    FOREIGN KEY ("adverseAdjudicationId") REFERENCES "adverseAdjudication" ("adverseAdjudicationId") ,
    FOREIGN KEY ("offenseSummaryId") REFERENCES "offenseSummary" ("offenseSummaryId") 
);

/* ---------------------------------------------------------------------- */
/* Add table "education"                                                  */
/* ---------------------------------------------------------------------- */

CREATE TABLE "education" (
    "educationId" TEXT NOT NULL,
    "personId" TEXT,
    "educationCredentialCode" TEXT,
    "educationCertificationCode" TEXT,
    "educationLevelCode" TEXT,
    "schoolId" TEXT NOT NULL,
    "educationStatusCode" TEXT,
    "educationProjectedTierId" TEXT,
    "dateCompleted" TEXT NOT NULL,
    "lastYearAttended" TEXT NOT NULL,
    "graduationYear" TEXT NOT NULL,
    "syncState" TEXT NOT NULL,
    CONSTRAINT "PK_education" PRIMARY KEY ("educationId"),
    FOREIGN KEY ("schoolId") REFERENCES "school" ("schoolId")  ON DELETE RESTRICT,
    FOREIGN KEY ("educationCredentialCode") REFERENCES "educationCredential" ("educationCredentialCode")  ON DELETE RESTRICT,
    FOREIGN KEY ("educationCertificationCode") REFERENCES "educationCertification" ("educationCertificationCode")  ON DELETE RESTRICT,
    FOREIGN KEY ("educationLevelCode") REFERENCES "educationLevel" ("educationLevelCode")  ON DELETE RESTRICT,
    FOREIGN KEY ("educationStatusCode") REFERENCES "educationStatus" ("educationStatusCode")  ON DELETE RESTRICT,
    FOREIGN KEY ("educationProjectedTierId") REFERENCES "educationProjectedTier" ("educationProjectedTierId") ,
    FOREIGN KEY ("personId") REFERENCES "person" ("personId") 
);

/* ---------------------------------------------------------------------- */
/* Add foreign key constraints                                            */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Add triggers                                                           */
/* ---------------------------------------------------------------------- */

CREATE TRIGGER "onPersonUpdate"
AFTER UPDATE ON person
WHEN new.syncState != 'C'
BEGIN
    UPDATE person SET syncState = 'U'
    WHERE personId = old.personId;
END;

CREATE TRIGGER "onPersonDelete"
AFTER DELETE ON person
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('person', old.personId);
END;

CREATE TRIGGER "onProspectCommentUpdate"
AFTER UPDATE ON prospectComment
WHEN new.syncState != 'C'
BEGIN
    UPDATE prospectComment SET syncState = 'U'
    WHERE prospectCommentId = old.prospectCommentId;
END;

CREATE TRIGGER "onProspectCommentDelete"
AFTER DELETE ON prospectComment
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('prospectComment', old.prospectCommentId);
END;

CREATE TRIGGER "onProspectUpdate"
AFTER UPDATE ON prospect
WHEN new.syncState != 'C'
BEGIN
    UPDATE prospect SET syncState = 'U'
    WHERE prospectId = old.prospectId;
END;

CREATE TRIGGER "onProspectDelete"
AFTER DELETE ON prospect
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('prospect', old.prospectId);
END;

CREATE TRIGGER "onAddressUpdate"
AFTER UPDATE ON address
WHEN new.syncState != 'C'
BEGIN
    UPDATE address SET syncState = 'U'
    WHERE addressId = old.addressId;
END;

CREATE TRIGGER "onAddressDelete"
AFTER DELETE ON address
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('address', old.addressId);
END;

CREATE TRIGGER "onDrugUseUpdate"
AFTER UPDATE ON drugUse
WHEN new.syncState != 'C'
BEGIN
    UPDATE drugUse SET syncState = 'U'
    WHERE drugUseId = old.drugUseId;
END;

CREATE TRIGGER "onDrugUseDelete"
AFTER DELETE ON drugUse
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('drugUse', old.drugUseId);
END;

CREATE TRIGGER "onMoralOffenseUpdate"
AFTER UPDATE ON moralOffense
WHEN new.syncState != 'C'
BEGIN
    UPDATE moralOffense SET syncState = 'U'
    WHERE moralOffenseId = old.moralOffenseId;
END;

CREATE TRIGGER "onMoralOffenseDelete"
AFTER DELETE ON moralOffense
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('moralOffense', old.moralOffenseId);
END;

CREATE TRIGGER "onExamUpdate"
AFTER UPDATE ON exam
WHEN new.syncState != 'C'
BEGIN
    UPDATE exam SET syncState = 'U'
    WHERE examId = old.examId;
END;

CREATE TRIGGER "onExamDelete" 
AFTER DELETE ON exam
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('exam', old.examId);
END;

CREATE TRIGGER "onDependentUpdate"
AFTER UPDATE ON dependent
WHEN new.syncState != 'C'
BEGIN
    UPDATE dependent SET syncState = 'U'
    WHERE dependentId = old.dependentId;
END;

CREATE TRIGGER "onDependentDelete"
AFTER DELETE ON dependent
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('dependent', old.dependentId);
END;

CREATE TRIGGER "onPriorServiceUpdate"
AFTER UPDATE ON priorService
WHEN new.syncState != 'C'
BEGIN
    UPDATE priorService SET syncState = 'U'
    WHERE priorServiceId = old.priorServiceId;
END;

CREATE TRIGGER "onPriorServiceDelete"
AFTER DELETE ON priorService
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('priorService', old.priorServiceId);
END;

CREATE TRIGGER "onPhysicalProblemUpdate"
AFTER UPDATE ON physicalProblem
WHEN new.syncState != 'C'
BEGIN
    UPDATE physicalProblem SET syncState = 'U'
    WHERE physicalProblemId = old.physicalProblemId;
END;

CREATE TRIGGER "onPhysicalProblemDelete"
AFTER DELETE ON physicalProblem
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('physicalProblem', old.physicalProblemId);
END;

CREATE TRIGGER "onEducationUpdate"
AFTER UPDATE ON education
WHEN new.syncState != 'C'
BEGIN
    UPDATE education SET syncState = 'U'
    WHERE educationId = old.educationId;
END;

CREATE TRIGGER "onEducationDelete"
AFTER DELETE ON education
WHEN old.syncState != 'C'
BEGIN
    INSERT INTO deleteHistory VALUES('education', old.educationId);
END;
