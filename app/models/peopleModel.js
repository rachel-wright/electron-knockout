const ko = require('knockout')
const komapping = require('knockout-mapping')
const async = require('async')
const prospects = require('../../data/prospects')
const dbaccess = require('../../lib/dbaccess')
const personModel = require('./personModel')

function PeopleModel() {
    var self = this
    var unwrap = ko.utils.unwrapObservable
    
    self.people = ko.observableArray([])
    // self.ethnicityList = ko.observableArray([])
    self.ethnicityList = ko.observableArray([])

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

    // to select a record, set the index to something
    self.index = ko.observable()
    self.person = ko.computed(_ =>{        
            return self.people()[self.index()] || {}
        }, self)
    select = function(person){
        self.index(self.people.indexOf(person))        
    }

    // Actions    
    self.init = function(){
        async.parallel ([
            (callback) => {
                self.people(
                    // use an explicitly declared model to get access to computed observables, functions, etc
                    prospects.data.slice(0,63).map(row => {return new personModel(row)})
                )
             callback(null)
            },
            (callback) => {
               getRefs()
               callback(null)
            }
        ],
        (err) => {
            if (err){
                console.log('error: ', err)
            }
        })
    }

    getRefs = function(){
        dbaccess.getReferenceData((err, data) => {
            if (data.ethnicityList instanceof Array){
                // to just get a plain-old observables array, use ko mapping
                self.ethnicityList(komapping.fromJS(data.ethnicityList))
            }
        })
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

