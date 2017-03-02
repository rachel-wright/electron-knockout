const ko = require('knockout')
const komapping = require('knockout-mapping')
const async = require('async')
const prospects = require('../../data/prospects')
const dbaccess = require('../../lib/dbaccess')

const refList = [
    'ethnicityList',
    'raceList',
    'recruitingSourceList',
    'religionList',
    'mepcomRaceList',
    'mepcomEthnicityList',
    'drugTypeList',
    'offenseTypeList',
    'recruitingActivityList',
    'citizenshipTypeList',
    'educationCredentialList',
    'educationCertificationList',
    'educationLevelList',
    'educationStatusList',
    'schoolList',
    'activityCommentList',
    'offenseList',
    'location'    
]

function ReferenceModel(){
    var self = this

    refList.forEach(item => {
        addModel(item)
    })
    
    self.init = function(){
        dbaccess.getReferenceData((err, data) => {
            if (err){
                console.log('dbaccess error ', err)
            } else {
                refList.forEach(item => {
                    loadModel(data, item)
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

