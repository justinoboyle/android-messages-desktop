const {
    app,
    BrowserWindow,
    Tray,
    nativeImage
} = require('electron')

const path = require('path')

let win
let tray

let UNREAD = 0

function createWindow() {
    tray = new Tray(nativeImage.createFromDataURL(__dirname, 'icon.png'))
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
    tray.on('click', () => toggleWindow())
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

function toggleWindow() {
    if(win.isVisible())
        win.hide()
    else
        win.show()
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
    else
        win.show()
})