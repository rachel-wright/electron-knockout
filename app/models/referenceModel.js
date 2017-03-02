const ko = require('knockout')
const komapping = require('knockout-mapping')
const async = require('async')
const prospects = require('../../data/prospects')
const dbaccess = require('../../lib/dbaccess')

function ReferenceModel(){
    var self = this


    self.ethnicityList = ko.observableArray([])
    self.raceList = ko.observableArray([])
    self.recruitingSourceList = ko.observableArray([])
    self.religionList = ko.observableArray([])
    self.mepcomRaceList = ko.observableArray([])
    self.mepcomEthnicityList = ko.observableArray([])
    self.drugTypeList = ko.observableArray([])
    self.offenseTypeList = ko.observableArray([])
    self.recruitingActivityList = ko.observableArray([])
    self.citizenshipTypeList = ko.observableArray([])
    self.educationCredentialList = ko.observableArray([])
    self.educationCertificationList = ko.observableArray([])
    self.educationLevelList = ko.observableArray([])
    self.educationStatusList = ko.observableArray([])
    self.schoolList = ko.observableArray([])
    self.activityCommentList = ko.observableArray([])
    self.offenseList = ko.observableArray([])
    self.location = ko.observableArray([])

    self.init = function(){
        dbaccess.getReferenceData((err, data) => {
            if (err){
                console.log('dbaccess error ', err)
            } else {
                self.load(data)
            }
        })
    }

    self.load = function(data){
        if (data.ethnicityList instanceof Array){
            // to just get a plain-old observables array, use ko mapping
            self.ethnicityList(komapping.fromJS(data.ethnicityList))
        }
        if (data.raceList instanceof Array){
            self.raceList(komapping.fromJS(data.raceList))
        }
        if (data.recruitingSourceList instanceof Array){
            self.recruitingSourceList(komapping.fromJS(data.recruitingSourceList))
        }
        if (data.religionList instanceof Array){
            self.religionList(komapping.fromJS(data.religionList))
        }
        if (data.mepcomRaceList instanceof Array){
            self.mepcomRaceList(komapping.fromJS(data.mepcomRaceList))
        }
        if (data.mepcomEthnicityList instanceof Array){
            self.mepcomEthnicityList(komapping.fromJS(data.mepcomEthnicityList))
        }
        if (data.drugTypeList instanceof Array){
            self.drugTypeList(komapping.fromJS(data.drugTypeList))
        }
        if (data.offenseTypeList instanceof Array){
            self.offenseTypeList(komapping.fromJS(data.offenseTypeList))
        }
        if (data.recruitingActivityList instanceof Array){
            self.recruitingActivityList(komapping.fromJS(data.recruitingActivityList))
        }
        if (data.citizenshipTypeList instanceof Array){
            self.citizenshipTypeList(komapping.fromJS(data.citizenshipTypeList))
        }
        if (data.educationCredentialList instanceof Array){
            self.educationCredentialList(komapping.fromJS(data.educationCredentialList))
        }
        if (data.educationCertificationList instanceof Array){
            self.educationCertificationList(komapping.fromJS(data.educationCertificationList))
        }
        if (data.educationLevelList instanceof Array){
            self.educationLevelList(komapping.fromJS(data.educationLevelList))
        }
        if (data.educationStatusList instanceof Array){
            self.educationStatusList(komapping.fromJS(data.educationStatusList))
        }
        if (data.schoolList instanceof Array){
            self.schoolList(komapping.fromJS(data.schoolList))
        }
        console.log('activityCommentList ', data.activityCommentList)
        if (data.activityCommentList instanceof Array){
            self.activityCommentList(komapping.fromJS(data.activityCommentList))
        }
        if (data.offenseList instanceof Array){
            self.offenseList(komapping.fromJS(data.offenseList))
        }
        if (data.location instanceof Array){
            self.location(komapping.fromJS(data.location))
        }

    }

}

module.exports = ReferenceModel

