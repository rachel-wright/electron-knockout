const {
    Menu,
    MenuItem
} = require('electron')

function createMainMenu(app, win) {
    const menu = new Menu()
    menu.append(new MenuItem({
        label: 'Modules',
        submenu: [{
            label: 'Applicant Board',
            click() {
                win.webContents.send('menu-pb')
            }
        }, {
            label: 'S && R Book',
            click() {
                win.webContents.send('menu-sr')
            }
        }, {
            type: 'separator'
        }, {
            label: 'Exit',
            click() {
                console.log('Exit App')
                app.quit()
            }
        }]
    }))

    menu.append(new MenuItem({
        label: 'Network',
        submenu: [{
            label: 'Sync',
            click(item) {
                win.webContents.send('menu-sync')
            }
        }]
    }))

    menu.append(new MenuItem({
        label: '',
        visible: false,
        submenu: [{
            label: 'Toggle Developer Tools',
            visible: false,
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.toggleDevTools()
            }
        }]
    }))

    win.setMenu(menu)
}

module.exports = {
    createMainMenu
}
