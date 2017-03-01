const Datastore = require('nedb')

const path = require('path')
const mkdirs = require('mkdirs')

const PROJ_NAME = 'MCRISS'
const APP_NAME = 'RCT'

const collections = {}

function init() {
    /*
    const appdata = process.env.APPDATA
    const dirname = path.join(appdata, PROJ_NAME, APP_NAME)
    mkdirs(dirname)
    collections.prospects = new Datastore({
        filename: path.join(dirname, 'prospects.db'),
        autoload: true
    })
    */

    collections.prospects = new Datastore({
        inMemoryOnly: true
    })

    const prospects = require('../data/prospects')
    collections.prospects.insert(prospects.data)
}

module.exports = {
    init,
    prospects: _ => {
        return collections.prospects
    }
}
