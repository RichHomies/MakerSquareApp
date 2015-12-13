var User = require('../db/user')
var Links = require('../db/links')
var Announcements = require('../db/announcement')
var mongoose = require('mongoose')
var ASQ = require('asynquence')
      //if user doesn't exist
          //ping github for auth ish
            //error-  pass to client
            //create user in db
            //return user obj to client
        //else
          //return user obj to client

function getUser (req, res, next){
  console.log('in getUser', req.body.code)
  var code = req.body.code
  User.findOne({code: code}).exec()
    .then(function(user){
      console.log('this is the user', user)
      if(user){
        res.status(200).json({user: user})
      } else {
        next();
      }
    })
}


function createUser (req, res){
  var isAlexJeng = res.loginName === 'AlexJeng' ? 'admin' : 'student'
  var userGithubProfile = {
    name : res.name,
    userName: res.loginName,
    avatar_url: res.avatar_url,
    role : {
      studentOrAdminRights : isAlexJeng,
    },
    tokens : {
      github : res.github
    },
    code : req.body.code
  }
  console.log('userGithubProfile', userGithubProfile)
  var newUser = new User(userGithubProfile)
  newUser.save()
    .then(function(user){
      user.tokens.github = null
      res.status(200).json({user: user})
    })
}








module.exports = {
  getUser : getUser,
  createUser : createUser
}