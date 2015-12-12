const ASQ = require('asynquence')
const options = {
  client_id: 'f110822db744ebfc266c',
  scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
};
const githubUrl = 'https://github.com/login/oauth/authorize?'
const authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes
const callbackUrl = 'http://localhost:8080/auth/callback?'

function getGithubTokenFromLocalStorage(webcontents, done){
  var options = {
    name: 'github',
    url : 'http://www.github.com'
  }
  webcontents.session.cookies.get(options, function(err, cookies){
    if(err || cookies.length === 0){
      done(null, err)
    } else {
      done(null);
    }
  })
}

function directToGithub (mainWindow, done){
  mainWindow.loadURL(authUrl);
  mainWindow.show();
  mainWindow.webContents.on('will-navigate', function (event, url) {
    if (url.indexOf(callbackUrl) !== -1) {
      done(url.split('=')[1])
    } else {
      done(null)
    }
  })
}

function setTokenInLocalStorage(webcontents, token, done){
  var options = {
    name: 'github',
    value : token,
    url : 'http://www.github.com'
  }
  webcontents.session.cookies.set(options, function(err){
    if(err){
      done.fail(err)
    } else {
      done(token)
    }
  })
}

function clearLocalStorage(webContents){
  webContents.session.cookies.remove({
    name: 'github',
    url : 'http://www.github.com'
  }, function(err){
    console.log('erradsdss', err);
  })
}


module.exports = {
  getGithubTokenFromLocalStorage : getGithubTokenFromLocalStorage,
  directToGithub : directToGithub,
  setTokenInLocalStorage : setTokenInLocalStorage
}