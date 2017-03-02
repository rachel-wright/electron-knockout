const ko = require('knockout')
const async = require('async')
const PeopleModel = require('./peopleModel')
const ReferenceModel = require('./referenceModel')

function MainModel(){
    var self = this

    self.peopleModel = new PeopleModel()
    self.referenceModel = new ReferenceModel()

    // Actions    
    self.init = function(){
        async.parallel ([
            (callback) => {                
               self.peopleModel.init()
               callback(null)
            },
            (callback) => {
               self.referenceModel.init()
               callback(null)
            }
        ],
        (err) => {
            if (err){
                console.log('error: ', err)
            }
        })
    }

}

module.exports = MainModel