//=============================================================================
// dbinsert.js
//
// Provides one function for each collection of objects returned from the API.
//
// Author: Frank Hellwig
//=============================================================================

'use strict'

const async = require('async')

const SYNC_STATE_SYNCED = 'S'

function toNullableBooleanInt(value) {
    if (value === null) return null
    if (value === true) return 1
    if (value === false) return 0
    return parseInt(value) ? 1 : 0
}

function toBooleanInt(value) {
    let int = toNullableBooleanInt(value)
    return int === null ? 0 : int
}

exports.activityComments = function (db, activityComments, callback) {
    async.eachSeries(activityComments, (obj, callback) => {
        db.run(`INSERT INTO [activityComment] (
                activityCommentId,
                recruitingActivityCode,
                commentTypeId,
                sortOrder)
                VALUES(?, ?, ?, ?)`,
            obj.activityCommentId,
            obj.recruitingActivityCode,
            obj.commentTypeId,
            obj.sortOrder,
            callback)
    }, callback)
}

exports.addressTypes = function (db, addressTypes, callback) {
    async.eachSeries(addressTypes, (obj, callback) => {
        db.run(`INSERT INTO [addressType] (
                addressTypeId,
                addressTypeName)
                VALUES(?, ?)`,
            obj.addressTypeId,
            obj.addressTypeName,
            callback)
    }, callback)
}

exports.birthVerifications = function (db, birthVerifications, callback) {
    async.eachSeries(birthVerifications, (obj, callback) => {
        db.run(`INSERT INTO [birthVerification] (
                birthVerificationCode,
                birthVerificationName)
                VALUES(?, ?)`,
            obj.birthVerificationCode,
            obj.birthVerificationName,
            callback)
    }, callback)
}

exports.careerDecisions = function (db, careerDecisions, callback) {
    async.eachSeries(careerDecisions, (obj, callback) => {
        db.run(`INSERT INTO [careerDecision] (
                careerDecisionId,
                careerDecisionName)
                VALUES(?, ?)`,
            obj.careerDecisionId,
            obj.careerDecisionName,
            callback)
    }, callback)
}

exports.cities = function (db, cities, callback) {
    async.eachSeries(cities, (obj, callback) => {
        db.run(`INSERT INTO [city] (
                countyId,
                cityId,
                cityName)
                VALUES(?, ?, ?)`,
            obj.countyId,
            obj.cityId,
            obj.cityName,
            callback)
    }, callback)
}

exports.citizenshipTypes = function (db, citizenshipTypes, callback) {
    async.eachSeries(citizenshipTypes, (obj, callback) => {
        db.run(`INSERT INTO [citizenshipType] (
                citizenshipTypeCode,
                citizenshipTypeName,
                candidateType)
                VALUES(?, ?, ?)`,
            obj.citizenshipTypeCode,
            obj.citizenshipTypeName,
            obj.candidateType,
            callback)
    }, callback)
}

exports.commentTypes = function (db, commentTypes, callback) {
    async.eachSeries(commentTypes, (obj, callback) => {
        db.run(`INSERT INTO [commentType] (
                commentTypeId,
                commentTypeCode,
                commentTypeName)
                VALUES(?, ?, ?)`,
            obj.commentTypeId,
            obj.commentTypeCode,
            obj.commentTypeName,
            callback)
    }, callback)
}

exports.counties = function (db, counties, callback) {
    async.eachSeries(counties, (obj, callback) => {
        db.run(`INSERT INTO [county] (
                stateId,
                countyId,
                countyName)
                VALUES(?, ?, ?)`,
            obj.stateId,
            obj.countyId,
            obj.countyName,
            callback)
    }, callback)
}

exports.countries = function (db, countries, callback) {
    async.eachSeries(countries, (obj, callback) => {
        db.run(`INSERT INTO [country] (
                countryId,
                countryName)
                VALUES(?, ?)`,
            obj.countryId,
            obj.countryName,
            callback)
    }, callback)
}

exports.dependentTypes = function (db, dependentTypes, callback) {
    async.eachSeries(dependentTypes, (obj, callback) => {
        db.run(`INSERT INTO [dependentType] (
                dependentTypeCode,
                dependentTypeName)
                VALUES(?, ?)`,
            obj.dependentTypeCode,
            obj.dependentTypeName,
            callback)
    }, callback)
}

exports.drugTypes = function (db, drugTypes, callback) {
    async.eachSeries(drugTypes, (obj, callback) => {
        db.run(`INSERT INTO [drugType] (
                drugTypeId,
                drugTypeName)
                VALUES(?, ?)`,
            obj.drugTypeId,
            obj.drugTypeName,
            callback)
    }, callback)
}

exports.dualSources = function (db, dualSources, callback) {
    async.eachSeries(dualSources, (obj, callback) => {
        db.run(`INSERT INTO [dualSource] (
                dualSourceId,
                dualSourceName)
                VALUES(?, ?)`,
            obj.dualSourceId,
            obj.dualSourceName,
            callback)
    }, callback)
}

exports.educationCertifications = function (db, educationCertifications, callback) {
    async.eachSeries(educationCertifications, (obj, callback) => {
        db.run(`INSERT INTO [educationCertification] (
                educationCertificationCode,
                educationCertificationName)
                VALUES(?, ?)`,
            obj.educationCertificationCode,
            obj.educationCertificationName,
            callback)
    }, callback)
}

exports.educationCredentials = function (db, educationCredentials, callback) {
    async.eachSeries(educationCredentials, (obj, callback) => {
        db.run(`INSERT INTO [educationCredential] (
                educationCredentialCode,
                educationCredentialName)
                VALUES(?, ?)`,
            obj.educationCredentialCode,
            obj.educationCredentialName,
            callback)
    }, callback)
}

exports.educationLevels = function (db, educationLevels, callback) {
    async.eachSeries(educationLevels, (obj, callback) => {
        db.run(`INSERT INTO [educationLevel] (
                educationLevelCode,
                educationLevelName)
                VALUES(?, ?)`,
            obj.educationLevelCode,
            obj.educationLevelName,
            callback)
    }, callback)
}

exports.educationProjectedTiers = function (db, educationProjectedTiers, callback) {
    async.eachSeries(educationProjectedTiers, (obj, callback) => {
        db.run(`INSERT INTO [educationProjectedTier] (
                educationProjectedTierId,
                educationProjectedTierName)
                VALUES(?, ?)`,
            obj.educationProjectedTierId,
            obj.educationProjectedTierName,
            callback)
    }, callback)
}

exports.educationStatuses = function (db, educationStatuses, callback) {
    async.eachSeries(educationStatuses, (obj, callback) => {
        db.run(`INSERT INTO [educationStatus] (
                educationStatusCode,
                educationStatusName)
                VALUES(?, ?)`,
            obj.educationStatusCode,
            obj.educationStatusName,
            callback)
    }, callback)
}

exports.emailTypes = function (db, emailTypes, callback) {
    async.eachSeries(emailTypes, (obj, callback) => {
        db.run(`INSERT INTO [emailType] (
                emailTypeId,
                emailTypeName)
                VALUES(?, ?)`,
            obj.emailTypeId,
            obj.emailTypeName,
            callback)
    }, callback)
}

exports.ethnicities = function (db, ethnicities, callback) {
    async.eachSeries(ethnicities, (obj, callback) => {
        db.run(`INSERT INTO [ethnicity] (
                ethnicityCode,
                ethnicityAbbreviation,
                ethnicityShortName,
                ethnicityLongName)
                VALUES(?, ?, ?, ?)`,
            obj.ethnicityCode,
            obj.ethnicityAbbreviation,
            obj.ethnicityShortName,
            obj.ethnicityLongName,
            callback)
    }, callback)
}

exports.examTypes = function (db, examTypes, callback) {
    async.eachSeries(examTypes, (obj, callback) => {
        db.run(`INSERT INTO [examType] (
                examTypeId,
                examTypeName)
                VALUES(?, ?)`,
            obj.examTypeId,
            obj.examTypeName,
            callback)
    }, callback)
}

exports.genders = function (db, genders, callback) {
    async.eachSeries(genders, (obj, callback) => {
        db.run(`INSERT INTO [gender] (
                genderCode,
                genderName)
                VALUES(?, ?)`,
            obj.genderCode,
            obj.genderName,
            callback)
    }, callback)
}

exports.heightWeightStandards = function (db, heightWeightStandards, callback) {
    async.eachSeries(heightWeightStandards, (obj, callback) => {
        db.run(`INSERT INTO [heightWeightStandard] (
                heightWeightStandardId,
                genderCode,
                height,
                minDepWgt,
                maxDepWgtUnder21,
                maxDepWgtUnder31,
                maxDepWgtUnder36,
                maxShipWgt,
                shipWgtOver5Pct,
                shipWgtOver10Pct,
                priSrvMinDepWgt,
                priSrvMaxDepWgt)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            obj.heightWeightStandardId,
            obj.gender,
            obj.height,
            obj.minDepWgt,
            obj.maxDepWgtUnder21,
            obj.maxDepWgtUnder31,
            obj.maxDepWgtUnder36,
            obj.maxShipWgt,
            obj.shipWgtOver5Pct,
            obj.shipWgtOver10Pct,
            obj.priSrvMinDepWgt,
            obj.priSrvMaxDepWgt,
            callback)
    }, callback)
}

exports.mepcomEthnicities = function (db, mepcomEthnicities, callback) {
    async.eachSeries(mepcomEthnicities, (obj, callback) => {
        db.run(`INSERT INTO [mepcomEthnicity] (
                mepcomEthnicityCode,
                mepcomEthnicityName,
                isActive)
                VALUES(?, ?, ?)`,
            obj.mepcomEthnicityCode,
            obj.mepcomEthnicityName,
            obj.isActive ? 1 : 0,
            callback)
    }, callback)
}

exports.mepcomRaces = function (db, mepcomRaces, callback) {
    async.eachSeries(mepcomRaces, (obj, callback) => {
        db.run(`INSERT INTO [mepcomRace] (
                mepcomRaceCode,
                mepcomRaceName)
                VALUES(?, ?)`,
            obj.mepcomRaceCode,
            obj.mepcomRaceName,
            callback)
    }, callback)
}

exports.offenses = function (db, offenses, callback) {
    async.eachSeries(offenses, (obj, callback) => {
        db.run(`INSERT INTO [offense] (
                offenseId,
                offenseTypeId,
                offenseName)
                VALUES(?, ?, ?)`,
            obj.offenseId,
            obj.offenseTypeId,
            obj.offenseName,
            callback)
    }, callback)
}

exports.offenseTypes = function (db, offenseTypes, callback) {
    async.eachSeries(offenseTypes, (obj, callback) => {
        db.run(`INSERT INTO [offenseType] (
                offenseTypeId,
                offenseTypeName)
                VALUES(?, ?)`,
            obj.offenseTypeId,
            obj.offenseTypeName,
            callback)
    }, callback)
}

exports.people = function (db, people, callback) {
    async.eachSeries(people, (obj, callback) => {
        db.run(`INSERT INTO [person] (
                personId,
                citizenshipCountryId,
                citizenshipTypeCode,
                secondCitizenshipCountryId,
                pobCityId,
                licenseStateId,
                religionCode,
                ethnicityCode,
                mepcomEthnicityCode,
                genderCode,
                raceCode,
                mepcomRaceCode,
                birthVerificationCode,
                firstName,
                middleName,
                lastName,
                suffix,
                digitalCommunication,
                nwaId,
                sector,
                dateOfBirth,
                pcReceived,
                alienRegistrationNumber,
                hasSocialSecurityCard,
                socialSecurityNumber,
                hasLicense,
                licenseExpirationDate,
                licenseNumber,
                hasDrugUse,
                hasMoralOffense,
                hasPhysicalProblem,
                syncState)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            obj.personId,
            obj.citizenshipCountryId,
            obj.citizenshipTypeCode,
            obj.secondCitizenshipCountryId,
            obj.pobCityId,
            obj.driverLicenseState,
            obj.religionCode,
            obj.ethnicityCode,
            obj.mepcomEthnicityCode,
            obj.gender,
            obj.raceCode,
            obj.mepcomRaceCode,
            obj.birthVerificationCode,
            obj.firstName,
            obj.middleName,
            obj.lastName,
            obj.suffix,
            obj.digitalCommunication,
            obj.nwaId,
            obj.sector,
            obj.dateOfBirth,
            toNullableBooleanInt(obj.pcReceived),
            obj.alienRegistrationNumber,
            toNullableBooleanInt(obj.hasSocialSecurityCard),
            obj.socialSecurityNumber,
            toNullableBooleanInt(obj.hasLicense),
            obj.licenseExpirationDate,
            obj.licenseNumber,
            toNullableBooleanInt(obj.hasDrugUse),
            toNullableBooleanInt(obj.hasMoralOffense),
            toNullableBooleanInt(obj.hasPhysicalProblem),
            SYNC_STATE_SYNCED,
            callback)
    }, callback)
}

exports.phoneTypes = function (db, phoneTypes, callback) {
    async.eachSeries(phoneTypes, (obj, callback) => {
        db.run(`INSERT INTO [phoneType] (
                phoneTypeId,
                phoneTypeName)
                VALUES(?, ?)`,
            obj.phoneTypeId,
            obj.phoneTypeName,
            callback)
    }, callback)
}

exports.priorities = function (db, priorities, callback) {
    async.eachSeries(priorities, (obj, callback) => {
        db.run(`INSERT INTO [priority] (
                priorityCode,
                priorityName)
                VALUES(?, ?)`,
            obj.priorityCode,
            obj.priorityName,
            callback)
    }, callback)
}

exports.races = function (db, races, callback) {
    async.eachSeries(races, (obj, callback) => {
        db.run(`INSERT INTO [race] (
                raceCode,
                raceName)
                VALUES(?, ?)`,
            obj.raceCode,
            obj.raceName,
            callback)
    }, callback)
}

exports.recruitingActivities = function (db, recruitingActivities, callback) {
    async.eachSeries(recruitingActivities, (obj, callback) => {
        db.run(`INSERT INTO [recruitingActivity] (
                recruitingActivityCode,
                recruitingActivityName,
                candidateType)
                VALUES(?, ?, ?)`,
            obj.recruitingActivityCode,
            obj.recruitingActivityName,
            obj.candidateType,
            callback)
    }, callback)
}

exports.recruitingSources = function (db, recruitingSources, callback) {
    async.eachSeries(recruitingSources, (obj, callback) => {
        db.run(`INSERT INTO [recruitingSource] (
                recruitingSourceCode,
                recruitingSourceName,
                candidateType,
                isActive)
                VALUES(?, ?, ?, ?)`,
            obj.recruitingSourceCode,
            obj.recruitingSourceName,
            obj.candidateType,
            obj.isActive ? 1 : 0,
            callback)
    }, callback)
}

exports.reenlistments = function (db, reenlistments, callback) {
    async.eachSeries(reenlistments, (obj, callback) => {
        db.run(`INSERT INTO [reenlistment] (
                reenlistmentCode,
                reenlistmentName)
                VALUES(?, ?)`,
            obj.reenlistmentCode,
            obj.reenlistmentName,
            callback)
    }, callback)
}

exports.religions = function (db, religions, callback) {
    async.eachSeries(religions, (obj, callback) => {
        db.run(`INSERT INTO [religion] (
                religionCode,
                religionName)
                VALUES(?, ?)`,
            obj.religionCode,
            obj.religionName,
            callback)
    }, callback)
}

exports.schools = function (db, schools, callback) {
    async.eachSeries(schools, (obj, callback) => {
        db.run(`INSERT INTO [school] (
                schoolId,
                schoolTypeCode,
                organizationId,
                dodCode,
                schoolName,
                street1,
                street2,
                city,
                stateCode,
                zipCode,
                telephoneNumber,
                isActive)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            obj.schoolId,
            obj.schoolTypeCode,
            obj.organizationId,
            obj.dodCode,
            obj.schoolName,
            obj.street1,
            obj.street2,
            obj.city,
            obj.stateCode,
            obj.zipCode,
            obj.telephoneNumber,
            obj.isActive ? 1 : 0,
            callback)
    }, callback)
}

exports.schoolTypes = function (db, schoolTypes, callback) {
    async.eachSeries(schoolTypes, (obj, callback) => {
        db.run(`INSERT INTO [schoolType] (
                schoolTypeCode,
                schoolTypeName)
                VALUES(?, ?)`,
            obj.schoolTypeCode,
            obj.schoolTypeName,
            callback)
    }, callback)
}

exports.separations = function (db, separations, callback) {
    async.eachSeries(separations, (obj, callback) => {
        db.run(`INSERT INTO [separation] (
                separationCode,
                separationName,
                separationType,
                candidateType)
                VALUES(?, ?, ?, ?)`,
            obj.separationCode,
            obj.separationName,
            obj.separationType,
            obj.candidateType,
            callback)
    }, callback)
}

exports.services = function (db, services, callback) {
    async.eachSeries(services, (obj, callback) => {
        db.run(`INSERT INTO [service] (
                serviceId,
                serviceCode,
                serviceName)
                VALUES(?, ?, ?)`,
            obj.serviceId,
            obj.serviceCode,
            obj.serviceName,
            callback)
    }, callback)
}

exports.serviceCharacters = function (db, serviceCharacters, callback) {
    async.eachSeries(serviceCharacters, (obj, callback) => {
        db.run(`INSERT INTO [serviceCharacter] (
                serviceCharacterCode,
                serviceCharacterShortName,
                serviceCharacterLongName)
                VALUES(?, ?, ?)`,
            obj.serviceCharacterCode,
            obj.serviceCharacterShortName,
            obj.serviceCharacterLongName,
            callback)
    }, callback)
}

exports.states = function (db, states, callback) {
    async.eachSeries(states, (obj, callback) => {
        db.run(`INSERT INTO [state] (
                countryId,
                stateId,
                stateName)
                VALUES(?, ?, ?)`,
            obj.countryId,
            obj.stateId,
            obj.stateName,
            callback)
    }, callback)
}

exports.verificationStatuses = function (db, verificationStatuses, callback) {
    async.eachSeries(verificationStatuses, (obj, callback) => {
        db.run(`INSERT INTO [verificationStatus] (
                verificationStatusCode,
                verificationStatusName)
                VALUES(?, ?)`,
            obj.verificationStatusCode,
            obj.verificationStatusName,
            callback)
    }, callback)
}
