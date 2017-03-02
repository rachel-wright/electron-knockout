const ko = require('knockout')
const komapping = require('knockout-mapping')
const prospects = require('../../data/prospects')
const personModel = require('./personModel')

function PeopleModel() {
    var self = this
    
    self.people = ko.observableArray([])

    // paging data properties - starts with the first 10 records
    self.firstRecord = ko.observable(0)
    self.numberOfRecords = ko.observable(10)


    self.peoplePage = ko.observableArray([])
    ko.computed(_ => {
        self.peoplePage(self.people().slice(self.firstRecord(),(self.firstRecord() + self.numberOfRecords())))        
    }, self)
    
    self.lastRecord = ko.computed(_ =>{
        return self.firstRecord() + self.peoplePage().length
    }, self) 
    self.pageRecords = ko.computed(_ => {
        return ('Records ').concat((self.firstRecord() + 1)).concat(' of ').concat(self.lastRecord())
    })

    // to select a record, set the index to something
    self.index = ko.observable()
    self.person = ko.computed(_ =>{        
            return self.people()[self.index()] || {}
        }, self)
    select = function(person){
        self.index(self.people.indexOf(person))        
    }

    self.init = function(){
        self.people(
                    // use an explicitly declared model to get access to computed observables, functions, etc
                    prospects.data.map(row => {return new personModel(row)})
                )
    }
    
    nextIndex = function(){
        i = self.firstRecord() + self.numberOfRecords() >  self.people().length ? self.firstRecord() : self.firstRecord() + self.numberOfRecords()
        self.firstRecord(i)
        self.index(null)
    }
    prevIndex = function(){
        i = self.firstRecord() > self.numberOfRecords() ? self.firstRecord() - self.numberOfRecords() : 0
        self.firstRecord(i)
        self.index(null)
    }
}


module.exports = PeopleModel

