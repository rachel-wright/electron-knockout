const async = require('async')
const VM = require('./app/models/peopleModel');
const db = require('./lib/old_database')
const pkglogger = require('pkglogger')
const appdir = require('./lib/appdir')

pkglogger.dir(appdir.resolve('logs'))


const views = {
    one: require('./app/one/view'),
    two: require('./app/two/view')
}

const {
    ipcRenderer
} = require('electron')

const sync = require('./lib/sync')

ipcRenderer.on('menu-sync', _ => {
    alert('Click OK to sync (it may take between 30 seconds to a minute)')
    sync.importData(err => {
        if (err) {
            alert('Sync error: Looks like you are not connected to a network. Please check your network connection and try again. (' + err.message + ')')
        } else {
            alert('Sync success')
            vm = new VM()
            vm.init(_ => {
                ko.applyBindings(VM)
            })
        }
    })
})

// $().ready(function () {	
//     async.waterfall(
//         [(callback) => {
//             vm = new VM()
//             ko.applyBindings(vm)
//             callback(null,vm)
//         },
//         (vm, callback) => {
//             vm.init()            
//             callback(null)
//         }] 
//     )  
// })

$().ready(_ => {
    // setTimeout(_ => {
        vm = new VM()
        ko.applyBindings(vm)
        vm.init()
    // }, 1000)   
})

db.init()

views.one.showMainContent()
views.two.showMainContent()


