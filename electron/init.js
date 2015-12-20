const ASQ = require('asynquence')
const Promise = require("bluebird")
const options = {
  client_id: '42ac71972dc1c3d5b947',
  scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
};
const githubUrl = 'https://github.com/login/oauth/authorize?'
const authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes
const callbackUrl = 'http://54.201.227.250/auth/callback?'
const i = 0;

//////////////////////////////////////////////////////////
//Code GraveYard - Start

// const callbackUrl = 'http://localhost:8080/auth/callback?'

// function getGithubTokenFromLocalStorage(webcontents, done){
//   var options = {
//     name: 'github',
//     url : 'http://www.github.com'
//   }
//   webcontents.session.cookies.get(options, function(err, cookies){
//     var githubCode = cookies.reduce(function(prevVal, currentVal) {
//       if (!prevVal && currentVal.name === 'github') {
//         return currentVal.value
//       } else {
//         return prevVal
//       }
//     }, null)
//     console.log('github code',githubCode)
//     if(err || !githubCode || githubCode === ''){
//       done(null, err)
//     } else {
//       done(githubCode)
//     }
//   })
// }
// mainWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
//   console.log('did redirect new', newUrl)
//   console.log('did redirect old', oldUrl)
//   if (newUrl.indexOf(callbackUrl) !== -1) {
//     done(newUrl.split('=')[1])
//   } else {
//     done(null)
//   }
// })
// function setTokenInLocalStorage(webcontents, code, done){
//   var options = {
//     name: 'github',
//     value : code,
//     url : 'http://www.github.com'
//   }
//   webcontents.session.cookies.set(options, function(err){
//     if(err){
//       done.fail(err)
//     } else {
//       done(code)
//     }
//   })
// }
// function clearLocalStorage(webContents){
//   webContents.session.cookies.remove({
//     name: 'github',
//     url : 'http://www.github.com'
//   }, function(err){
//     console.log('erradsdss', err);
//   })
// }
//Code GraveYard - Stop
//////////////////////////////////////////////////////////

function directToGithub (mainWindow){
  console.log('directing to github')
  const githubCodePromise = new Promise(function(resolve, reject){
    mainWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
      console.log('oldUrl', oldUrl)
      console.log('newUrl', newUrl)
      if (newUrl.indexOf(callbackUrl) !== -1) {
        console.log('got the code!')
        resolve({code: newUrl.split('=')[1]})
      } else {
        reject(null)
      }
    })
    console.log('directing to github')
    mainWindow.loadURL(authUrl);
    mainWindow.show();
  })
  return githubCodePromise;
}

function init (mainWindow) {  
  console.log('initializing directing to github')
  return directToGithub(mainWindow)
  .then(function(code){
    console.log('code from github - going back to indexjs', code);
    return code;
  })
}


module.exports = {
  init: init
}