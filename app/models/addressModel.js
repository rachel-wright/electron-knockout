
function AddressModel(address){
	var self = this

	self.addressId = ko.observable(address.addressId)
	self.personId = ko.observable(address.personId)
	self.addressType = ko.observable(address.addressType)
	self.street1 = ko.observable(address.street1)
	self.street2 = ko.observable(address.street2)
	self.city = ko.observable(address.city)
	self.state = ko.observable(address.state)
	self.county = ko.observable(address.county)
	self.zipCode = ko.observable(address.zipCode)
	self.syncState = ko.observable(address.syncState)

}

module.exports = AddressModel