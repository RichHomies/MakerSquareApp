const init = require('./init')
const ASQ = require('asynquence')
const Promise = require("bluebird")
function initializeChannel(ipcMain, webContents){
  console.log('initializing channel, setting promise')
  const ipcChannelPromiseRequestForGitHubCode = new Promise(function(resolve, reject){
    ipcMain.on('asynchronous-message', function(event, arg) {
      if(arg.method === 'GET' && arg.resource === 'githubToken'){
        arg['type'] = 'response'
        console.log('resolving eventArgs')
        resolve({event: event, arg: arg})
      }
    });
  });
  return ipcChannelPromiseRequestForGitHubCode;
}

function ipcPromise (event, arg){
  event.sender.send('asynchronous-reply', 'shit')
  event.sender.send('asynchronous-reply', arg)

}

module.exports = {
  initializeChannel: initializeChannel
}