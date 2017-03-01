function ethnicityViewModel(obj){
    var self = this

    self.ethnicityCode = ko.observable(obj.ethnicityCode)
    self.ethnicityAbbreviation = ko.observable(obj.ethnicityAbbreviation)

}

module.exports = ethnicityViewModel