const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 760, minWidth: 800, minHeight: 480,
    backgroundColor: '#0b1a12', title: 'Billiard Master',
    icon: path.join(__dirname, 'www', 'icon.png'),
    autoHideMenuBar: true, show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  Menu.setApplicationMenu(null);
  win.once('ready-to-show', () => win.show());
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });
  win.loadFile(path.join(__dirname, 'www', 'index.html'));
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
