var User = require('../db/user')
var Links = require('../db/links')
var Announcements = require('../db/announcement')
var mongoose = require('mongoose')
var ASQ = require('ASQ')
      //if user doesn't exist
          //ping github for auth ish
            //error-  pass to client
            //create user in db
            //return user obj to client
        //else
          //return user obj to client

function getUser (req, res, next){
  var code = req.body.code
  User.findOne({code: code}).exec()
    .then(function(user){
      if(user._id){
        res.status(200).json({user: user})
      } else {
        next();
      }
    })
}


function createUser (req, res){
  var userGithubProfile = {
    userName : res.userName,
    role : {
      studentOrAdminRights : res.role.studentOrAdminRights,
      cohort : res.role.cohort
    },
    tokens : {
      github : res.tokens.gihub
    },
    code : req.body.code
  }

  var newUser = new User(userGithubProfile)
  newUser.save()
    .then(function(user){
      res.status(200).json({user: user})
    })
}








module.exports = {
  getUser : getUser,
  createUser : createUser
}