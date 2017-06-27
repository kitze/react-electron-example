const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const notifier = require('node-notifier');

let mainWindow;

const autoUpdater = require('electron-updater').autoUpdater;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
  initAutoUpdate();
}

function initAutoUpdate() {
  if (isDev) {
    return;
  }

  if (process.platform === 'linux') {
    return;
  }

  autoUpdater.checkForUpdates();
  autoUpdater.signals.updateDownloaded(showUpdateNotification);
}

function showUpdateNotification(it) {
  it = it || {};
  const restartNowAction = 'Restart now';

  const versionLabel = it.label ? `Version ${it.version}` : 'The latest version';

  notifier.notify(
    {
      title: 'A new update is ready to install.',
      message: `${versionLabel} has been downloaded and will be automatically installed after restart.`,
      closeLabel: 'Okay',
      actions: restartNowAction
    },
    function(err, response, metadata) {
      if (err) throw err;
      if (metadata.activationValue !== restartNowAction) {
        return;
      }
      autoUpdater.quitAndInstall();
    }
  );
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
