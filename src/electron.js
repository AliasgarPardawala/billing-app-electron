import { app, BrowserWindow, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';
import * as url from 'url';

let mainWindow;

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
            nodeIntegration: true,
        },
    });

    const startURL = isDev
        ? 'http://localhost:3000'
        : url.format({
            pathname: `Users/aliasgar/electron-billing-app/build/index.html`,
            protocol: 'file:',
            slashes: true
        })

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
