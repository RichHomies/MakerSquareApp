'use babel';
'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const ipcMain = electron.ipcMain;
const init = require('./init');
const ipcChannel = require('./ipcChannel');
var ipcChannelPromise;
var notificationCount = 0
let mainWindow;


function clearLocalStorage(webContents){
  webContents.session.cookies.remove({
    name: 'github',
    url : 'http://www.github.com'
  }, function(err){
    console.log('erradsdss', err);
  })
}

function initializeElectronNotifications(){
  ipcMain.on('notification-inc', function(event, arg) {
    console.log('recieved notification-inc arg', arg)
    if (!arg.initialCall) {
      console.log('in here')
      notificationCount++
    }
    if (notificationCount > 0) {
      app.dock.setBadge(notificationCount.toString())
    }
  })
}

function initializeMainWindow(){
  mainWindow = new BrowserWindow({width: 1000, height: 600});
  ipcChannelPromise = ipcChannel.initializeChannel(ipcMain, mainWindow.webContents)

  mainWindow.webContents.on('did-stop-loading', function(event, url) {
    let urlArray = mainWindow.webContents.getURL().split('electron/public/')
    let currentWindowLocation = urlArray[urlArray.length - 1]
    console.log('url ', url)
    if (currentWindowLocation.indexOf('index.html') !== -1) {
      init.init(mainWindow)
      .then(function(code){
        console.log('back in indexjs with the code - fixing to load', code)
        mainWindow.loadURL(`file://${__dirname}/public/index.html`);
        ipcChannelPromise
        .then(function(eventArgsObjs){
          eventArgsObjs.arg['code'] = code.code
          console.log('sending code to webpage')
          eventArgsObjs.event.sender.send('asynchronous-reply', eventArgsObjs.arg)
        })
      })
    } 

  })

  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  mainWindow.webContents.openDevTools();
  let focused = true
  mainWindow.on('focus', function() {
      focused = true
    notificationCount = 0 //resets the new notification count when app is focused
    app.dock.setBadge('')

  })

  mainWindow.on('blur', function() {
    focused = false
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}


electron.crashReporter.start();

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  initializeElectronNotifications()
  initializeMainWindow()
});



