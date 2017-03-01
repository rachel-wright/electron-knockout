const async = require('async')
const database = require('./database')
const Location = require('./dto/Location')

function _getReferenceData(db, callback) {
    let data = {}
    async.series([
        callback => {
            db.all(`SELECT * FROM [drugType]`, (err, rows) => {
                data.drugTypeList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [ethnicity]`, (err, rows) => {
                data.ethnicityList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [mepcomEthnicity]`, (err, rows) => {
                data.mepcomEthnicityList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [race]`, (err, rows) => {
                data.raceList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [mepcomRace]`, (err, rows) => {
                data.mepcomRaceList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [religion]`, (err, rows) => {
                data.religionList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [citizenshipType]`, (err, rows) => {
                data.citizenshipTypeList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [educationCredential]`, (err, rows) => {
                data.educationCredentialList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [educationCertification]`, (err, rows) => {
                data.educationCertificationList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [educationLevel]`, (err, rows) => {
                data.educationLevelList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [educationStatus]`, (err, rows) => {
                data.educationStatusList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [recruitingSource] WHERE candidateType IN ('B', 'E')`, (err, rows) => {
                data.recruitingSourceList = rows
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [recruitingActivity]`, (err, rows) => {
                if (err) return callback(err)
                data.recruitingActivityList = []
                async.eachSeries(rows, (row, callback) => {
                    db.all(`SELECT
                            a.activityCommentId,
                            a.commentTypeId,
                            c.commentTypeCode,
                            c.commentTypeName
                            FROM [activityComment] a
                            INNER JOIN [commentType] c
                            ON a.commentTypeId = c.commentTypeId
                            WHERE recruitingActivityCode = ?
                            ORDER BY a.sortOrder`,
                        row.recruitingActivityCode,
                        (err, rows) => {
                            if (err) return callback(err)
                            let recruitingActivity = {
                                recruitingActivityCode: row.recruitingActivityCode,
                                recruitingActivityName: row.recruitingActivityName,
                                activityCommentList: []
                            }
                            data.recruitingActivityList.push(recruitingActivity)
                            rows.forEach(row => {
                                recruitingActivity.activityCommentList.push(row)
                            })
                            callback(null)
                        })
                }, callback)
            })
        },
        callback => {
            db.all(`SELECT * FROM [offenseType]`, (err, rows) => {
                if (err) return callback(err)
                data.offenseTypeList = []
                async.eachSeries(rows, (row, callback) => {
                    db.all(`SELECT offenseId, offenseName FROM [offense] WHERE offenseTypeId = ?`,
                        row.offenseTypeId,
                        (err, rows) => {
                            if (err) return callback(err)
                            let offenseType = {
                                offenseTypeId: row.offenseTypeId,
                                offenseTypeName: row.offenseTypeName,
                                offenseList: []
                            }
                            data.offenseTypeList.push(offenseType)
                            rows.forEach(row => {
                                offenseType.offenseList.push(row)
                            })
                            callback(null)
                        })
                }, callback)
            })
        },
        callback => {
            Location.load(db, (err, location) => {
                data.location = location
                callback(err)
            })
        },
        callback => {
            db.all(`SELECT * FROM [school]`, (err, rows) => {
                data.schoolList = rows
                callback(err)
            })
        },
    ], err => {
        data.getOffenseList = function (offenseTypeId) {
            let offenseType = this.offenseTypeList.find(offenseType => {
                return offenseType.offenseTypeId == offenseTypeId
            })
            return offenseType ? offenseType.offenseList : null
        }
        data.getActivityCommentList = function (recruitingActivityCode) {
          let recruitingActivity = this.recruitingActivityList.find(recruitingActivity => {
              return recruitingActivity.recruitingActivityCode = recruitingActivityCode
          })
          return recruitingActivity ? recruitingActivity.activityCommentList : null
        }
        callback(err, data)
    })
}

function _dbaction(fn, callback) {
    database.init((err, db) => {
        if (err) return callback(err)
        fn(db, (err, data) => {
            db.close(_ => {
                callback(err, data)
            })
        })
    })
}

function getReferenceData(callback) {
    _dbaction(_getReferenceData, callback)
}

function getOperationalData(callback) {
    callback(new Error('Not yet implemented'))
}

module.exports = {
    getReferenceData,
    getOperationalData
}

if (require.main === module) {
    getReferenceData((err, data) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Success')
        }
    })
}