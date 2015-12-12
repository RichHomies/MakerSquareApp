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
      var githubCode = cookies.reduce(function(prevVal, currentVal) {
        if (!prevVal && currentVal.name === 'github') {
          return currentVal.value
        } else {
          return prevVal
        }
      }, null)
      done(githubCode)
    }
  })
}

function directToGithub (mainWindow, done){
  mainWindow.loadURL(authUrl);
  mainWindow.show();
  mainWindow.webContents.on('will-navigate', function (event, url) {
    console.log('url', url)
    if (url.indexOf(callbackUrl) !== -1) {
      done(url.split('=')[1])
    } else {
      done(null)
    }
  })
}

function setTokenInLocalStorage(webcontents, code, done){
  var options = {
    name: 'github',
    value : code,
    url : 'http://www.github.com'
  }
  webcontents.session.cookies.set(options, function(err){
    if(err){
      done.fail(err)
    } else {
      done(code)
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

function init (mainWindow) {
  //get code
    //get from local storage
  //if response=good
    //load page
  //if response =not good
    //get code from github
    //load page
  ASQ(function(done){
    getGithubTokenFromLocalStorage(mainWindow.webContents, done)
  })
  .then(function(done, data){
    console.log('data from git', data);
    if(data){
      console.log('got it');
      mainWindow.loadURL(`file://${__dirname}/public/index.html`);
    } else {
      console.log('ayyo')
      directToGithub(mainWindow, done)
    }
  })  
  .then(function(done, code){
    console.log('code ', code);  
    setTokenInLocalStorage(mainWindow.webContents, code, done)
  })
  .then(function(done, code){
    mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  })
  .or(function(err){
    console.log('err ', err)
  })
}


module.exports = {init: init}