const prospects = require('../../data/prospects')
const AM = require('./addressModel')

function PersonModel(person){
	var self = this;

    self.personId = person.socialSecurityNumber  //person.personId
    self.citizenshipCountryId = ko.observable(person.citizenshipCountryId)
    self.pobCityId = ko.observable(person.pobCityId)
    self.licenseStateId = ko.observable(person.licenseStateId)
    self.citizenshipTypeCode = ko.observable(person.citizenshipTypeCode)
    self.religionCode = ko.observable(person.religionCode)
    self.ethnicityCode = ko.observable(person.ethnicityCode)
    self.mepcomEthnicityCode = ko.observable(person.mepcomEthnicityCode)
    self.raceCode = ko.observable(person.raceCode)
    self.mepcomRaceCode = ko.observable(person.mepcomRaceCode)
    self.firstName = ko.observable(person.firstName)
    self.lastName = ko.observable(person.lastName)
    self.gender = ko.observable(person.gender)
    self.race = ko.observable(person.race)
    self.homePhone = ko.observable(person.homePhone)
    self.cellPhone = ko.observable(person.cellPhone)
    self.emailAddress = ko.observable(person.emailAddress)
    self.digitalCommunication = ko.observable(person.digitalCommunication)
    self.status = ko.observable(person.status)
    self.disposition = ko.observable(person.disposition)
    self.sector = ko.observable(person.sector)
    self.dateOfBirth = ko.observable(person.dateOfBirth)
    self.pcReceived = ko.observable(person.pcReceived)
    self.hasSocialSecurityCard = ko.observable(person.hasSocialSecurityCard)
    self.alienRegistrationNumber = ko.observable(person.alienRegistrationNumber)
    self.hasLicense = ko.observable(person.hasLicense)
    self.licenseExpirationDate = ko.observable(person.licenseExpirationDate)
    self.licenseNumber = ko.observable(person.licenseNumber)
    self.hasDrugUse = ko.observable(person.hasDrugUse)
    self.hasMoralOffense = ko.observable(person.hasMoralOffense)
    self.hasPhysicalProblem = ko.observable(person.hasPhysicalProblem)
    self.birthVerification = ko.observable(person.birthVerification)
    self.syncState = ko.observable(person.syncState)

    self.fullName = ko.computed(_ =>{
        	return self.firstName() + " " + self.lastName()
    	}, self)

 }


module.exports = PersonModel

