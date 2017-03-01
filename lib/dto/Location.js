//=============================================================================
// Location.js
//
// The MCRISS RCT Location Data Transfer Object (DTO).
//
// Usage:
//
//    const Location = require('Location')
//
//    Location.load(db, (err, location) => {
//        ...
//    })
//
// Author: Frank Hellwig
//=============================================================================

const async = require('async')

const US = 'UNITED STATES'

class Location {

    constructor() {
        this._countries = []
        this._countriesByCountryId = {}
        this._statesByStateId = {}
        this._countiesByCountyId = {}
        this._citiesByCityId = {}
        this._count = {}
    }

    get countries() {
        return this._countries
    }

    get count() {
        return this._count
    }

    get americanStates() {
        const us = this.findCountry(US)
        return us ? us.states : []
    }

    findCountry(countryId) {
        return this._countriesByCountryId[countryId] || null
    }

    findState(stateId) {
        return this._statesByStateId[stateId] || null
    }

    findCounty(countyId) {
        return this._countiesByCountyId[countyId] || null
    }

    findCity(cityId) {
        return this._citiesByCityId[cityId] || null
    }

    static load(db, callback) {
        let location = new Location()
        location._load(db, err => {
            location._cleanup()
            location._sortCountries()
            callback(err, location)
        })
    }

    _load(db, callback) {
        const self = this
        async.series([
            callback => {
                self._loadCountries(db, callback)
            },
            callback => {
                self._loadStates(db, callback)
            },
            callback => {
                self._loadCounties(db, callback)
            },
            callback => {
                self._loadCities(db, callback)
            }
        ], callback)
    }

    _loadCountries(db, callback) {
        const self = this
        db.all(`SELECT countryId, countryName FROM [country] ORDER BY countryName`, (err, rows) => {
            if (err) return callback(err)
            self._count.countries = rows.length
            rows.forEach(row => {
                // Create the country object.
                let country = {
                    countryId: row.countryId,
                    countryName: row.countryName,
                    states: []
                }
                // Add the country to the country list and lookup object.
                self._countries.push(country)
                self._countriesByCountryId[country.countryId] = country
            })
            callback(null)
        })
    }

    _sortCountries() {
        let countries = [null]
        this._countries.forEach(country => {
            if (country.countryName.toUpperCase() === US) {
                countries[0] = country
            } else {
                countries.push(country)
            }
        })
        this._countries = countries
    }

    _loadStates(db, callback) {
        const self = this
        db.all(`SELECT countryId, stateId, stateName FROM [state] ORDER BY stateName`, (err, rows) => {
            if (err) return callback(err)
            self._count.states = rows.length
            rows.forEach(row => {
                // Create the state object.
                let state = {
                    countryId: row.countryId,
                    stateId: row.stateId,
                    stateName: row.stateName,
                    counties: []
                }
                // Add the state to the state lookup object.
                self._statesByStateId[state.stateId] = state
                // Connect the state to a country.
                let country = self._countriesByCountryId[state.countryId]
                if (country) {
                    country.states.push(state)
                    state.country = country
                }
            })
            callback(null)
        })
    }

    _loadCounties(db, callback) {
        const self = this
        db.all(`SELECT stateId, countyId, countyName FROM [county] ORDER BY countyName`, (err, rows) => {
            if (err) return callback(err)
            self._count.counties = rows.length
            rows.forEach(row => {
                // Create the county object.
                let county = {
                    stateId: row.stateId,
                    countyId: row.countyId,
                    countyName: row.countyName,
                    cities: []
                }
                // Add the county to the county lookup object.
                self._countiesByCountyId[county.countyId] = county
                // Connect the county to a state.
                let state = self._statesByStateId[county.stateId]
                if (state) {
                    state.counties.push(county)
                    county.state = state
                }
            })
            callback(null)
        })
    }

    _loadCities(db, callback) {
        const self = this
        db.all(`SELECT countyId, cityId, cityName FROM [city] ORDER BY cityName`, (err, rows) => {
            if (err) return callback(err)
            self._count.cities = rows.length
            rows.forEach(row => {
                // Create the city object.
                let city = {
                    countyId: row.countyId,
                    cityId: row.cityId,
                    cityName: row.cityName,
                }
                // Add the city to the city lookup object.
                self._citiesByCityId[city.cityId] = city
                // Connect the city to a county.
                let county = self._countiesByCountyId[city.countyId]
                if (county) {
                    county.cities.push(city)
                    city.county = county
                }
            })
            callback(null)
        })
    }

    /**
     * Remove countries, states, and counties that are empty.
     */
    _cleanup() {
        const KEEP_COUNTRIES = true
        this._countries = this._countries.filter(country => {
            country.states = country.states.filter(state => {
                state.counties = state.counties.filter(county => {
                    return county.cities.length > 0
                })
                return state.counties.length > 0
            })
            return KEEP_COUNTRIES || country.states.length > 0
        })
    }
}

module.exports = Location