const ko = require('knockout')
const async = require('async')
const peopleModel = require('./peopleModel')
const referenceModel = require('./referenceModel')

function MainModel(){
    var self = this

    self.peopleModel = new peopleModel()
    self.referenceModel = new referenceModel()

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