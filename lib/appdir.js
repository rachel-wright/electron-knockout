//=============================================================================
// appdir.js
//
// Application Directory Module
//
// Encapsulates the generation of the MCRISS RCT runtime data direcory.
//
// This directory is {User}/AppData/Local/MCRISS/RCT.
//
// Author: Frank Hellwig
//=============================================================================

const path = require('path')

const PROJ_NAME = 'MCRISS'
const APP_NAME = 'RCT'

const appdata = process.env.LOCALAPPDATA
const appdir = path.join(appdata, PROJ_NAME, APP_NAME)

function dir() {
    return appdir
}

dir.resolve = function () {
    const args = Array.prototype.slice.call(arguments)
    return path.resolve.apply(path, [appdir].concat(args))
}

module.exports = dir