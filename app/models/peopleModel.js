const async = require('async')
const prospects = require('../../data/prospects')
const dbaccess = require('../../lib/dbaccess')
const ethnicityViewModel = require('./ethnicityViewModel')
const PM = require('./personModel')

function PeopleModel() {
    var self = this; 
    
    self.people = ko.observableArray()
    self.peopleList = ko.observableArray()
    self.ethnicityList = ko.observableArray()

    // navigation properties - default is first 10 records
    self.firstRecord = ko.observable(0)
    self.numberOfRecords = ko.observable(10)

    self.getRefs = function(){
        dbaccess.getReferenceData((err, data) => {
            if (data.ethnicityList instanceof Array){
                self.ethnicityList(data.ethnicityList.map(item => { return new ethnicityViewModel(item)}))
            }
        })
    }

    // pull a subset of records for display 
    self.getList = function(){
        a = self.firstRecord() || 0
        b = self.numberOfRecords() + a > self.people().length ? self.people().length : a + self.numberOfRecords()
        self.peopleList(self.people().slice(a,b))
    }

    // selected record
    self.index = ko.observable(0)
    self.person = ko.computed(_ =>{        
            return self.people()[self.index()] || {}
        }, self)

    self.getPerson = function(person){
        self.index(self.people.indexOf(person))
    }

    self.lastRecord = ko.computed(_ =>{
        return self.firstRecord() + self.numberOfRecords()
    }, self)
    
    self.init = function(){
        async.waterfall([
            (callback) => {
                self.people(
                    prospects.data.map(row => {return new PM(row)})
                )
                callback(null)
            // },
            // (callback) => {
            //    self.getRefs()
            //    console.log('refs ', self.ethnicityList())
            //    callback(null)
            // },
            // (callback) => {
            //    self.getList()
            //    callback(null)
            }
        ])
    }

    nextIndex = function(){
        i = self.firstRecord() + self.numberOfRecords()
        self.firstRecord(i)
        self.getList()
        self.index(null)
    }
    prevIndex = function(){
        i = self.firstRecord() >= self.numberOfRecords() ? self.firstRecord() - self.numberOfRecords() : 0
        self.firstRecord(i)
        self.getList()
        self.index(null)
    }

    // fill the default list 
    // self.getList()
    // self.getRefs()
}


module.exports = PeopleModel

