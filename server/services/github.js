var request = require('request')
var config = require('../config')
var ASQ = require('asynquence')
var querystring = require('querystring')

function getUserToken (req, res, next) {
  //send post request to https://github.com/login/oauth/access_token
    //send object with client_id, client_secret, code
  ASQ(function(done) {
    getToken(req.body.code, done)
  })
    .then(function(done, statusCode, access_token) {
      res['github'] = access_token
      getUserProfileFromGithub(access_token, done)
    })
    .then(function(done, userObj) {
      console.log(userObj)
      res.name = userObj.name
      res.avatar_url = userObj.avatar_url
      res.loginName = userObj.loginName
      next()
    })
}

function getToken (code, done) {
  var qs = querystring.stringify({
    client_id: config.github.client_id,
    client_secret: config.github.secret,
    code: code
  })
  console.log('qs to get token', qs)
  request.post('https://github.com/login/oauth/access_token?'+qs, function(error, response, body){
    console.log('this is body', body)
    if(error) {
      console.log('error from github', error)
      done.fail(response.statusCode, error)
    } else {
      var parsedBody = querystring.parse(body)
      console.log('parsed Body from github', parsedBody);
      done(response.statusCode, parsedBody.access_token)
    }
  })
}

function getUserProfileFromGithub (token, done) {
  var qs = querystring.stringify({
    access_token: token
  })
  var githubUrl = 'https://api.github.com/user?' + qs
  var options = {
    url: githubUrl,
    headers: {
      'User-Agent': 'makersquare'
    }
  }
  request.get(options, function(error, response, body) {
    if (error) {
      console.log(error)
      done.fail(error)
    } else {
      // console.log('response inside getUserProfileFromGithub', response)
      console.log('body inside getUserProfileFromGithub', body)
      body = JSON.parse(body)
      var userObj = {
        name : body.name,
        avatar_url : body.avatar_url,
        loginName : body.login
      }
      done(userObj)
    }

  })
}




module.exports = {
  getUserToken: getUserToken
}