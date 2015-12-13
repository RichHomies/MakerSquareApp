const init = require('./init')
const ASQ = require('asynquence')

function initializeChannel(ipcMain, webContents){
  ipcMain.on('asynchronous-message', function(event, arg) {
    console.log('recieved message', arg)
    if(arg.method === 'GET' && arg.resource === 'githubToken'){
      ASQ(function(done){
        init.getGithubTokenFromLocalStorage(webContents, done)
      })
      .then(function(done, code){
        arg['body'] = code
        arg['type'] = 'response'
        event.sender.send('asynchronous-reply', arg)
      })
      .or(function(err){
        event.sender.send('asynchronous-reply', 'shit')
      })
    }
  });
}



module.exports = {
  initializeChannel: initializeChannel
}