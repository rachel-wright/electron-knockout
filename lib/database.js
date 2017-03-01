//=============================================================================
// database.js
//
// SQLite Database Initialization Module
//
// Manages the MCRISS RCT database instance. This module exports a single
// function, init. Calling init will open the database or create it if it
// does not exist. After the database is created, it is initialized using
// the SQL file exported from the data modeling tool.
//
// A recreate method is attached to the database object. This method will
// close the database and delete the database file. It then recreates the
// database using the init function.
//
// The database object also has an additional property called 'created',
// which is a boolean flag indicating whether the database was opened
// (false) or created (true).
//
// Notes:
//
// 1. The database is created in the user's local AppData directory.
//
// 2. The SQL initialization file is expected to be in the data/sql
//    directory and must be named create_sqlite.sql.
//
// Usage:
//
//    database.init(function (err, db) {
//        if (err) {
//            console.error(err.message)
//        } else {
//            do things with the db object...
//        }
//    })
//
// Author: Frank Hellwig
//=============================================================================

//-----------------------------------------------------------------------------
// Module Dependencies
//-----------------------------------------------------------------------------

const sqlite3 = require('sqlite3')
const async = require('async')
const path = require('path')
const fs = require('fs')
const mkdirs = require('mkdirs')
const pkglogger = require('pkglogger')
const pkgfinder = require('pkgfinder')
const git = require('git-rev')
const appdir = require('./appdir')
const dbwrapper = require('./dbwrapper')

//-----------------------------------------------------------------------------
// Module Constants
//-----------------------------------------------------------------------------

const DB_DIR = 'data'
const DB_NAME = 'mcriss-rct.db'
const SQLITE_CANTOPEN = 'SQLITE_CANTOPEN'

//-----------------------------------------------------------------------------
// Module Initialization
//-----------------------------------------------------------------------------

// Initialize the logger for this module.
const log = pkglogger(module)

// Initialize the pkgfinder utility to create package-relative paths.
const pkg = pkgfinder()

// Construct the database filename in the user's local AppData directory.
const datadir = appdir.resolve(DB_DIR)
const dbfile = appdir.resolve(DB_DIR, DB_NAME)

// Construct the SQL source filename in this package's data directory.
const sqlfile = pkg.resolve('data', 'sql', 'create_sqlite.sql')

//-----------------------------------------------------------------------------
// Private Functions
//-----------------------------------------------------------------------------

/**
 * Gets the current application version for comparing against the version
 * stored in the database. This will determine if the database is current
 * or if it should be recreated (and resynced).
 * 
 * During development, the Git revision changes more frequently than the
 * version stored in the package.json file. Therefore, we try to get the
 * revision from Git and, if that is not available (i.e., in production),
 * we use the version from the package.json file.
 * 
 * The callback is called with only one string parameter.
 */
function _getCurrentVersion(callback) {
    git.short(rev => {
        callback(rev || pkg.version)
    })
}

/**
 * Determines if the current application version differs from the version
 * stored in the database. This determines if the database must be recreated
 * (and resynced).
 * 
 * The callback is called as callback(err, isCurrent).
 */
function _isDatabaseCurrent(db, callback) {
    _getCurrentVersion(currentVersion => {
        db.getAppVersion(db, (err, storedVersion) => {
            if (err) return callback(err)
            const isCurrent = currentVersion === storedVersion
            log.info('Database current: {0} (current version: {1}, stored version: {2})',
                isCurrent ? 'YES' : 'NO', currentVersion, storedVersion)
            callback(null, isCurrent)
        })
    })
}

/**
 * Attempts to open the database. The callback is called as callback(err, db).
 * If the error code SQLITE_CANTOPEN, then the callback is called with a null
 * value as the second parameter indicating that the database must be created.
 */
function openDatabase(callback) {
    const db = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE, function (err) {
        if (err) {
            if (err.code === SQLITE_CANTOPEN) {
                callback(null, null)
            } else {
                callback(err)
            }
        } else {
            log.info(`Opened database '${dbfile}'`)
            callback(null, dbwrapper(db))
        }
    })
}

/**
 * Creates the directory for the database and then creates the database.
 * The callback is called as callback(err, db).
 */
function createDatabase(callback) {
    try {
        mkdirs(datadir)
    } catch (e) {
        return callback(e);
    }
    async.waterfall([
        (callback) => {
            // Create the database file.
            const db = new sqlite3.Database(dbfile, function (err) {
                callback(err, dbwrapper(db))
            })
        },
        (db, callback) => {
            // Read the SQL file.
            fs.readFile(sqlfile, 'utf8', function (err, sql) {
                if (err) {
                    callback(err)
                } else {
                    callback(null, db, sql)
                }
            })
        },
        (db, sql, callback) => {
            // Run the code in the SQL file.
            db.exec(sql, function (err) {
                callback(err, db)
            })
        },
        (db, callback) => {
            // Write the application version into the database.
            _getCurrentVersion(version => {
                db.updateAppVersion(version, err => {
                    callback(err, db)
                })
            })
        }
    ], (err, db) => {
        if (err) return callback(err)
        log.info(`Created database '${dbfile}'`)
        db.created = true
        callback(null, db)
    })
}

/**
 * Closes the database then deletes the database file.
 */
function deleteDatabase(db, callback) {
    async.series([
        callback => {
            if (db) {
                db.close(callback)
            } else {
                callback(null)
            }
        },
        callback => {
            fs.unlink(dbfile, err => {
                if (err && err.code !== 'ENOENT') return callback(err)
                callback(null)
            })
        }
    ], (err) => {
        if (err) return callback(err)
        log.info(`Deleted database '${dbfile}'`)
        callback(null)
    })
}

function openOrCreateDatabase(callback) {
    async.waterfall([
        (callback) => {
            openDatabase(callback)
        },
        (db, callback) => {
            if (db) {
                _isDatabaseCurrent(db, (err, isCurrent) => {
                    if (err) return callback(err)
                    if (isCurrent) {
                        callback(null, db)
                    } else {
                        deleteDatabase(db, err => {
                            callback(err, null)
                        })
                    }
                })
            } else {
                callback(null, null)
            }
        },
        (db, callback) => {
            // The db parameter is null if the database must be created.
            if (db) return callback(null, db)
            createDatabase(callback)
        },
        (db, callback) => {
            db.exec('PRAGMA foreign_keys = ON', err => {
                callback(err, db)
            })
        }
    ], function (err, db) {
        if (err) {
            log.error(err.message)
        }
        callback(err, db)
    })
}

/**
 * Closes the database, deletes the database file, and then recreates it.
 */
function recreateDatabase(db, callback) {
    async.waterfall([
        (callback) => {
            deleteDatabase(db, callback)
        },
        function (callback) {
            init(callback)
        }
    ], function (err, db) {
        if (err) {
            log.error(err.message)
        }
        callback(err, db)
    })
}

//-----------------------------------------------------------------------------
// Public Functions
//-----------------------------------------------------------------------------

function init(callback) {
    openOrCreateDatabase((err, db) => {
        if (err) return callback(err)
        return callback(null, db)
        db.recreate = function (callback) {
            recreateDatabase(this, callback)
        }
        db.enableForeignKeys = function (callback) {
            db.exec('PRAGMA foreign_keys = ON', err => {
                callback(err)
            })
        }
        db.disableForeignKeys = function (callback) {
            db.exec('PRAGMA foreign_keys = OFF', err => {
                callback(err)
            })
        }
        callback(null, db)
    })
}

function create(callback) {
    deleteDatabase(null, err => {
        if (err) return callback(err)
        init(callback)
    })
}

//-----------------------------------------------------------------------------
// Module Exports
//-----------------------------------------------------------------------------

exports.init = init
exports.create = create

//-----------------------------------------------------------------------------
// Sample Usage
//-----------------------------------------------------------------------------

function example() {
    const readline = require('readline-sync')
    init(function (err, db) {
        db.run('INSERT INTO country (countryId, countryName) VALUES("US", "United States")', function (err) {
            if (err) {
                console.error(err.message)
            } else {
                console.log('Inserted country')
                readline.question('Press Enter to recreate the database')
                db.recreate(function (err, db) {
                    console.log(err, db)
                })
            }
        })
    })
}