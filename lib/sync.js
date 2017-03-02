//=============================================================================
// sync.js
//
// Synchronizes RCT with MCRISS. It does this using the following procedure:
//
//     1. Query the database for created, updated, and deleted entities.
//     2. Send the create, update, and delete information to the API.
//     3. Delete and recreate the database.
//     4. Retrieve and insert the reference data.
//     5. Retrieve and insert the operational data.
//
// Usage:
//
//    const sync = require('./sync') // adjust path as needed
//    sync.execute(progress, callback)
//
//    The progress callback is called with one string argument indicating the
//    current progress of the sync. The final callback is called when the sync
//    is complete. It is called as callback(err).
//    
// Author: Frank Hellwig
//=============================================================================

'use strict'

const async = require('async')
const pkglogger = require('pkglogger')
const api = require('./api')
const database = require('./database')
const dbinsert = require('./dbinsert')

const log = pkglogger(module)

function importData(callback) {
    database.create((err, db) => {
        if (err) return callback(err)
        _importData(db,
            msg => {
                console.log(msg)
            },
            err => {
                if (err) return callback(err)
                db.close(_ => {
                    callback(err)
                })
            }
        )
    })
}

function _importData(db, progress, callback) {
    let begin = Date.now()
    progress('[INFO] Beginning sync process.')
    async.waterfall([
        // (callback) => {
        //     progress('[WAIT] Receiving LOCATION data from the remote server...')
        //     api.getLocationData((err, data) => {
        //         if (err) return callback(err)
        //         progress('[DONE] Successfully received the LOCATION data.')
        //         callback(null, data)
        //     })
        // },
        // (data, callback) => {
        //     progress('[WAIT] Inserting LOCATION data into the local database...')
        //     insertLocationData(db, data, err => {
        //         if (err) return callback(err)
        //         progress('[DONE] Successfully inserted the LOCATION data.')
        //         callback(null)
        //     })
        // },
        // (callback) => {
        //     progress('[WAIT] Receiving SCHOOL data from the remote server...')
        //     api.getSchoolData((err, data) => {
        //         if (err) return callback(err)
        //         progress('[DONE] Successfully received the SCHOOL data.')
        //         callback(null, data)
        //     })
        // },
        // (data, callback) => {
        //     progress('[WAIT] Inserting SCHOOL data into the local database...')
        //     insertSchoolData(db, data, err => {
        //         if (err) return callback(err)
        //         progress('[DONE] Successfully inserted the SCHOOL data.')
        //         callback(null)
        //     })
        // },
        (callback) => {
            progress('[WAIT] Receiving REFERENCE data from the remote server...')
            api.getReferenceData((err, data) => {
                if (err) return callback(err)
                progress('[DONE] Successfully received the REFERENCE data.')
                callback(null, data)
            })
        },
        (data, callback) => {
            progress('[WAIT] Inserting REFERENCE data into the local database...')
            insertReferenceData(db, data, err => {
                if (err) return callback(err)
                progress('[DONE] Successfully inserted the REFERENCE data.')
                callback(null)
            })
        },
        // (callback) => {
        //     progress('[WAIT] Receiving PERSON data from the remote server...')
        //     api.getPersonData((err, data) => {
        //         if (err) return callback(err)
        //         progress('[DONE] Successfully received the PERSON data.')
        //         callback(null, data)
        //     })
        // },
        // (data, callback) => {
        //     progress('[WAIT] Inserting PERSON data into the local database...')
        //     insertPersonData(db, data, err => {
        //         if (err) return callback(err)
        //         progress('[DONE] Successfully inserted the PERSON data.')
        //         callback(null)
        //     })
        // },
        (callback) => {
            db.updateLastSynced((err, now) => {
                progress(`[INFO] Updated last-synced date/time to ${now}.`)
                callback(err)
            })
        }
    ], err => {
        if (err) {
            progress('[FAIL] ' + err.message)
        } else {
            let end = Date.now()
            let seconds = Math.trunc((end - begin) / 1000)
            let minutes = Math.floor(seconds / 60)
            minutes = (minutes < 10) ? '0' + minutes : minutes
            seconds = seconds - minutes * 60
            seconds = (seconds < 10) ? '0' + seconds : seconds
            progress(`[INFO] Sync success (${minutes}:${seconds}).`)
        }
        callback(err)
    })
}

function insertLocationData(db, data, callback) {
    async.series([
        callback => {
            db.exec('PRAGMA foreign_keys = ON', callback)
        },
        callback => {
            db.exec('BEGIN TRANSACTION', callback)
        },
        callback => {
            dbinsert.countries(db, data.countries, callback)
        },
        callback => {
            dbinsert.states(db, data.states, callback)
        },
        callback => {
            dbinsert.counties(db, data.counties, callback)
        },
        callback => {
            dbinsert.cities(db, data.cities, callback)
        },
        callback => {
            db.exec('END TRANSACTION', callback)
        },
    ], err => {
        callback(err)
    })
}

function insertSchoolData(db, data, callback) {
    async.series([
        callback => {
            db.exec('PRAGMA foreign_keys = ON', callback)
        },
        callback => {
            db.exec('BEGIN TRANSACTION', callback)
        },
        callback => {
            dbinsert.schoolTypes(db, data.schoolTypes, callback)
        },
        callback => {
            dbinsert.schools(db, data.schools, callback)
        },
        callback => {
            db.exec('END TRANSACTION', callback)
        },
    ], err => {
        callback(err)
    })
}

function insertReferenceData(db, data, callback) {
    async.series([
        callback => {
            db.exec('PRAGMA foreign_keys = OFF', callback)
        },
        callback => {
            db.exec('BEGIN TRANSACTION', callback)
        },
        callback => {
            dbinsert.activityComments(db, data.activityComments, callback)
        },
        callback => {
            dbinsert.addressTypes(db, data.addressTypes, callback)
        },
        callback => {
            dbinsert.birthVerifications(db, data.birthVerifications, callback)
        },
        callback => {
            dbinsert.careerDecisions(db, data.careerDecisions, callback)
        },
        callback => {
            dbinsert.citizenshipTypes(db, data.citizenshipTypes, callback)
        },
        callback => {
            dbinsert.commentTypes(db, data.commentTypes, callback)
        },
        callback => {
            dbinsert.dependentTypes(db, data.dependentTypes, callback)
        },
        callback => {
            dbinsert.drugTypes(db, data.drugTypes, callback)
        },
        callback => {
            dbinsert.dualSources(db, data.dualSources, callback)
        },
        callback => {
            dbinsert.educationCertifications(db, data.educationCertifications, callback)
        },
        callback => {
            dbinsert.educationCredentials(db, data.educationCredentials, callback)
        },
        callback => {
            dbinsert.educationLevels(db, data.educationLevels, callback)
        },
        callback => {
            dbinsert.educationProjectedTiers(db, data.educationProjectedTiers, callback)
        },
        callback => {
            dbinsert.educationStatuses(db, data.educationStatuses, callback)
        },
        callback => {
            dbinsert.emailTypes(db, data.emailTypes, callback)
        },
        callback => {
            dbinsert.ethnicities(db, data.ethnicities, callback)
        },
        // callback => {
        //     dbinsert.examTypes(db, data.examTypes, callback)
        // },
        callback => {
            dbinsert.genders(db, data.genders, callback)
        },
        callback => {
            dbinsert.heightWeightStandards(db, data.heightWeightStandards, callback)
        },
        callback => {
            dbinsert.mepcomEthnicities(db, data.mepcomEthnicities, callback)
        },
        callback => {
            dbinsert.mepcomRaces(db, data.mepcomRaces, callback)
        },
        callback => {
            dbinsert.offenses(db, data.offenses, callback)
        },
        callback => {
            dbinsert.offenseTypes(db, data.offenseTypes, callback)
        },
        callback => {
            dbinsert.phoneTypes(db, data.phoneTypes, callback)
        },
        callback => {
            dbinsert.priorities(db, data.priorities, callback)
        },
        callback => {
            dbinsert.races(db, data.races, callback)
        },
        callback => {
            dbinsert.recruitingActivities(db, data.recruitingActivities, callback)
        },
        callback => {
            dbinsert.recruitingSources(db, data.recruitingSources, callback)
        },
        callback => {
            dbinsert.reenlistments(db, data.reenlistments, callback)
        },
        callback => {
            dbinsert.religions(db, data.religions, callback)
        },
        callback => {
            dbinsert.separations(db, data.separations, callback)
        },
        callback => {
            dbinsert.services(db, data.services, callback)
        },
        callback => {
            dbinsert.serviceCharacters(db, data.serviceCharacters, callback)
        },
        callback => {
            dbinsert.verificationStatuses(db, data.verificationStatuses, callback)
        },
        callback => {
            db.exec('END TRANSACTION', callback)
        },
    ], err => {
        callback(err)
    })
}

function insertPersonData(db, data, callback) {
    async.series([
        callback => {
            db.exec('PRAGMA foreign_keys = ON', callback)
        },
        callback => {
            db.exec('BEGIN TRANSACTION', callback)
        },
        callback => {
            dbinsert.people(db, data.people, callback)
        },
        callback => {
            db.exec('END TRANSACTION', callback)
        },
    ], err => {
        callback(err)
    })
}

module.exports = {
    importData
}

if (require.main === module) {
    importData(err => {
        if (err) {
            console.error(err.message)
        }
    })
}