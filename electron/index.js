'use babel';
'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const init = require('./init');
const ASQ = require('asynquence')


// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the rowser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, show: false});



  // if we have github cookie
  //   open mksHomePage
  // else
  //   direct to githubauth

  ASQ(function(done){
    init.getGithubTokenFromLocalStorage(mainWindow.webContents, done)
  })
  .then(function(done, data){
    console.log('data from git', data);
    if(data){
      console.log('got it');
      mainWindow.loadURL(`file://${__dirname}/public/index.html`);
    } else {
      init.directToGithub(mainWindow, done)
    }
  })  
  .then(function(done, token){
    console.log('token ', token);  
    init.setTokenInLocalStorage(mainWindow.webContents, token, done)
  })
  .then(function(done, token){
    mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  })
  .or(function(err){
    console.log('err ', err)
  })


  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});