import { app, BrowserWindow, screen, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import * as path from "path";
import * as fs from "fs";

let mainWindow;


const HOME_PATH = path.join(app.getPath('home'), 'Billing')

const getFilePath = (data) => {
    return path.join(HOME_PATH, data.type ,data.title+'.pdf')
}
ipcMain.on('save-pdf', async (event, data) => {
    fs.writeFileSync(getFilePath(data), await Buffer.from(data.document))
})

function createWindow() {

    const primaryDisplay = screen.getPrimaryDisplay()
    const {screenWidth, screenHeight} = primaryDisplay.workAreaSize
    mainWindow = new BrowserWindow({
        width: screenWidth,
        height: screenHeight,
        minWidth: screenWidth / 2,
        minHeight: screenHeight / 2,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            preload:  path.join(app.getAppPath(), 'src', 'preload.js')
        },
    });

    const startURL = isDev
        ? 'http://localhost:5173/billing-app-electron/invoices'
        : 'https://aliasgarpardawala.github.io/billing-app-electron'

    mainWindow.loadURL(startURL);
    mainWindow.maximize();
    mainWindow.show();

    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
