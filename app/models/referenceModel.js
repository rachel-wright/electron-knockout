const ko = require('knockout')
const komapping = require('knockout-mapping')
const async = require('async')
const prospects = require('../../data/prospects')
const dbaccess = require('../../lib/dbaccess')

function ReferenceModel(){
    var self = this

    self.referenceList = ko.observableArray([
                {name: 'ethnicityList', optionsText: 'ethnicityAbbreviation', optionsValue: 'ethnicityCode', label: 'Ethnicity'},
                {name: 'raceList', optionsText:"raceName", optionsValue: "raceCode"},
                {name: 'recruitingSourceList', optionsText:"recruitingSourceName", optionsValue: "recruitingSourceCode"},
                {name: 'religionList', optionsText:"religionName", optionsValue: "religionCode"},
                {name: 'mepcomRaceList', optionsText:"mepcomRaceName", optionsValue: "mepcomRaceCode"},
                {name: 'mepcomEthnicityList', optionsText:"mepcomEthnicityName", optionsValue: "mepcomEthnicityCode"},
                {name: 'drugTypeList', optionsText:"drugTypeName", optionsValue: "drugTypeId"},
                {name: 'offenseTypeList', optionsText:"offenseTypeName", optionsValue: "offenseTypeId"},
                {name: 'recruitingActivityList', optionsText:"recruitingActivityCode", optionsValue: "recruitingActivityCode"},
                {name: 'citizenshipTypeList',optionsText:"citizenshipTypeName", optionsValue: "citizenshipTypeCode" },
                {name: 'educationCredentialList', optionsText:"educationCredentialName", optionsValue: "educationCredentialCode"},
                {name: 'educationCertificationList', optionsText:"educationCertificationName", optionsValue: "educationCertificationCode"},
                {name: 'educationLevelList', optionsText:"educationLevelName", optionsValue: "educationLevelCode"},
                {name: 'educationStatusList', optionsText:"educationStatusName", optionsValue: "educationStatusCode"},
                {name: 'schoolList', optionsText:"", optionsValue: "" },
                {name: 'activityCommentList', optionsText:"commentTypeName", optionsValue: "commentTypeName"},
                {name: 'offenseList', optionsText:"offenseName", optionsValue: "offenseId"},
                {name: 'location', optionsText:"", optionsValue: ""}   
            ])

    self.referenceList().forEach(item => {
        addModel(item.name)
    })
    
    self.init = function(){
        dbaccess.getReferenceData((err, data) => {
            if (err){
                console.log('dbaccess error ', err)
            } else {
                self.referenceList().forEach(item => {
                    loadModel(data, item.name)
                })
            }
        })
    }

    function addModel(name){
        self[name] = ko.observableArray([])
    }

    function loadModel(data, name){
        if (data[name] instanceof Array){
            self[name](komapping.fromJS(data[name]))
        }
    }

}

module.exports = ReferenceModel

