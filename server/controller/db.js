var User = require('../db/user')
var Links = require('../db/links')
var Announcements = require('../db/announcement')
var mongoose = require('mongoose')
var ASQ = require('asynquence')
var model = {
  link : Links,
  announcement : Announcements
}

function saveToDb (model, dataObj){
  console.log('savetodb')
  var item = new model(dataObj);
  return item.save()
}


function getUser (req, res, next){
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

  saveToDb(User, userGithubProfile)
    .then(function(user){
      user.tokens.github = null
      res.status(200).json({user: user})
    })
}

function save(type, data) {
  console.log('saving')
  return saveToDb(model[type], data)
}

function fetch(type){
  return model[type].find({}).exec()
}


module.exports = {
  getUser : getUser,
  createUser : createUser,
  save : save,
  fetch : fetch
}