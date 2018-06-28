const {
    app,
    BrowserWindow
} = require('electron')

const path = require('path')

let win

let UNREAD = 0

function createWindow() {

    win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        title: "Android Messages",
        icon:  path.join(__dirname, 'icon.png')
    })
    win.setTitle("Android Messages")
    updateUnread()

    win.loadURL('https://messages.android.com/')

    win.on('closed', () => {
        win = null
    })
    win.on('page-title-updated', (event, title) => {
        UNREAD = getUnreadFromTitle(title)
        updateUnread()
        win.setTitle("Android Messages")
    })
}

function updateUnread() {
    app.dock.setBadge(UNREAD === 0 ? "" : (UNREAD + ""))
    
}

function getUnreadFromTitle(title) {
    if(!title.includes('(') || !title.includes(')'))
        return 0
    try {
        return parseInt(title.split('(')[1].split(')')[0])
    } catch (e) {
        return 0
    }
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

app.on('activate', () => {
    if (win === null)
        createWindow()
})