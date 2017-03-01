//=============================================================================
// api.js
//
// Provides the interface to Josh French's MCRISS RCT API.
//
// Author: Frank Hellwig
//=============================================================================

'use strict'

const fs = require('fs')
const pkgfinder = require('pkgfinder')
const pkgconfig = require('pkgconfig')
const HttpService = require('@be/http-service')

const pkg = pkgfinder()
const cfg = pkgconfig()
const endpoint = cfg.api.endpoint
const certificate = cfg.api.certificate
const pathnames = cfg.api.pathnames

const options = {
    pfx: fs.readFileSync(pkg.resolve('data', 'certs', certificate.filename)),
    passphrase: certificate.password,
    rejectUnauthorized: false,
    agent: false
}

const service = new HttpService(endpoint.uri, options)

function getLocationData(callback) {
    service.get(pathnames.locationData, (err, data, type) => {
        callback(err, data)
    })
}

function getSchoolData(callback) {
    service.get(pathnames.schoolData, (err, data, type) => {
        callback(err, data)
    })
}

function getOperationalData(callback) {
    service.get(pathnames.operationalData, (err, data, type) => {
        callback(err, data)
    })
}

function getReferenceData(callback) {
    service.get(pathnames.referenceData, (err, data, type) => {
        callback(err, data)
    })
}

function getPersonData(callback) {
    service.get(pathnames.personData, (err, data, type) => {
        callback(err, data)
    })
}

function postOperationalData(data, callback) {
    service.post(pathnames.operationalData, data, (err, response, type) => {
        callback(err, response)
    })
}

module.exports = {
    getLocationData,
    getSchoolData,
    getOperationalData,
    getReferenceData,
    getPersonData,
    postOperationalData
}