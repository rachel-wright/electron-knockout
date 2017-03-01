const ko = require('knockout')

function ethnicityViewModel(a,b){
    var self = this

    self.ethnicityCode = ko.observable(a)//obj.ethnicityCode)
    self.ethnicityAbbreviation = ko.observable(b)//obj.ethnicityAbbreviation)

}

function ethnicityListViewModel(obj){
    var self = this

    self.ethnicityList = ko.observableArray([new ethnicityViewModel('a','b')])

    self.add = function(row){
        self.ethnicityList().push(new ethnicityViewModel(row))
    }

}

module.exports = ethnicityListViewModel