//=============================================================================
// dbwrapper.js
//
// Wrapper around the SQLite database object.
//
// Provides the common SQLite methods (exec, run, get, all, and close) as well
// as other additional RCT-specific housekeeping methods for handling database
// versioning and managing the last synced time.
//
// Usage:
//
//    const dbwrapper = require('./dbwrapper')
//    db = dbwrapper(instance)
//
// Author: Frank Hellwig
//=============================================================================

//-----------------------------------------------------------------------------
// Module Dependencies
//-----------------------------------------------------------------------------

const pkglogger = require('pkglogger')

//-----------------------------------------------------------------------------
// Module Constants
//-----------------------------------------------------------------------------

const APP_VERSION = 'appVersion'
const LAST_SYNCED = 'lastSynced'

//-----------------------------------------------------------------------------
// Module Initialization
//-----------------------------------------------------------------------------

const log = pkglogger(module)

//-----------------------------------------------------------------------------
// Wrapper Class
//-----------------------------------------------------------------------------

function Wrapper(db) {
    this.db = db
}

Wrapper.prototype.run = function () {
    const args = Array.prototype.slice.call(arguments)
    const sql = args[0]
    const params = args.slice(1, -1)
    const callback = args[args.length - 1]
    this.db.run.call(this.db, sql, params, function (err) {
        if (err) {
            const _sql = sql.replace(/\s+/g, ' ').trim()
            const _params = JSON.stringify(params)
            err.message += `: ${_sql} ${_params}`
        }
        callback.call(this, err)
    })
}

Wrapper.prototype.exec = function () {
    this.db.exec.apply(this.db, arguments)
}

Wrapper.prototype.get = function () {
    this.db.get.apply(this.db, arguments)
}

Wrapper.prototype.all = function () {
    this.db.all.apply(this.db, arguments)
}

Wrapper.prototype.close = function () {
    this.db.close.apply(this.db, arguments)
}

/**
 * Gets the version from the 'appVersion' entry in the database
 * appSetting table. This will be the latest version written to
 * the database under the 'appVersion' key when the database is
 * created.
 * 
 * The callback is called as callback(err, version). If no version
 * is found, then the version parameter is set to null.
 */
Wrapper.prototype.getAppVersion = function (db, callback) {
    const sql = `SELECT value FROM appSetting WHERE name = '${APP_VERSION}'`
    this.db.get(sql, (err, row) => {
        if (err) return callback(err)
        callback(null, row ? row.value : null)
    })
}

/**
 * Writes the specified application version into the database.
 * 
 * The callback is called as callback(err).
 */
Wrapper.prototype.updateAppVersion = function (version, callback) {
    const sql = `INSERT OR REPLACE INTO appSetting VALUES ('${APP_VERSION}', ?)`
    this.db.run(sql, version, callback)
}

/**
 * Returns the ISO date time string of the last sync.
 * The callback is called as callback(err, value).
 * The string will be null if no entry exists in the database.
 */
Wrapper.prototype.getLastSynced = function (callback) {
    const sql = `SELECT value FROM appSetting WHERE name = '${LAST_SYNCED}'`
    this.db.get(sql, (err, row) => {
        if (err || !row) return callback(err, null)
        callback(null, row.value)
    })
}

/**
 * Returns the time in milliseconds since the last sync.
 * The callback is called as callback(err, time).
 * The time will be null if no value exists in the database.
 */
Wrapper.prototype.getLastSyncedTime = function (callback) {
    this.getLastSynced(sql, (err, value) => {
        if (err || !value) return callback(err, null)
        callback(null, Date.parse(value))
    })
}

/**
 * Returns the number of days since the last sync.
 * The callback is called as callback(err, days).
 * The days value will be null if a sync has not been performed.
 */
Wrapper.prototype.daysSinceLastSync = function (callback) {
    this.getLastSyncedTime((err, time) => {
        if (err || time === null) return callback(err, null)
        const now = Date.now()
        const day = 86400000 // milliseconds in a day
        callback(null, Math.floor((now - time) / day))
    })
}

/**
 * Updates the last synced database value to the current date and time.
 * The callback is called as callback(err).
 */
Wrapper.prototype.updateLastSynced = function (callback) {
    const now = new Date().toISOString()
    const sql = `INSERT OR REPLACE INTO appSetting VALUES('${LAST_SYNCED}', ?)`
    this.db.run(sql, now, callback)
}

//-----------------------------------------------------------------------------
// Module Exports
//-----------------------------------------------------------------------------

module.exports = function (db) {
    return new Wrapper(db)
}