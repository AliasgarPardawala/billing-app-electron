import { app, BrowserWindow, screen } from 'electron';
import isDev from 'electron-is-dev';

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
