'use babel';
'use strict';
const electron = require('electron')
const app = electron.app
const init = require('./init')
var notificationCount = 0
var mainWindow;


function initializeElectronApp(){
  electron.crashReporter.start()
  app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform != 'darwin') {
    //   app.quit();
    // }
  });

  app.on('ready', function() {
    app.on('activate', function(event, hasVisibleWindows){
      if(!hasVisibleWindows){
        console.log('showing window')
        mainWindow.show();
      }
    })



    var ipcChannelPromise = ipcChannel.initializeChannel(ipcMain, mainWindow.webContents)

    ipcMain.on('notification-inc', function(event, arg) {
      console.log('recieved notification-inc arg', arg)
      if (!arg.initialCall) {
        console.log('in here')
        notificationCount++
      }
      if (notificationCount > 0 && !mainWindow.isVisible()) {
        app.dock.setBadge(notificationCount.toString())
      }
    })

    mainWindow.webContents.on('did-stop-loading', function(event, url) {
      var urlArray = mainWindow.webContents.getURL().split('electron/public/')
      var currentWindowLocation = urlArray[urlArray.length - 1]
      console.log('url ', urlArray)
      if (currentWindowLocation.indexOf('landing.html') !== -1) {
        init.init(mainWindow)
        .then(function(code){
          console.log('back in indexjs with the code - fixing to load index', code)
          mainWindow.loadURL(`file://${__dirname}/public/index.html`);
          ipcChannelPromise
          .then(function(eventArgsObjs){
            eventArgsObjs.arg['code'] = code.code
            console.log('sending code to webpage')
            eventArgsObjs.event.sender.send('asynchronous-reply', eventArgsObjs.arg)
          })
        })

      } else {
        console.log('dam son')
      }      
    })


  });

}




 