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
  var item = new model(dataObj);
  return item.save()
}

function deleteFromDb(model, idObj) {
  console.log('deleteFromDb', idObj)
  var item = model.find({_id: idObj.id})
  return item.remove().exec()
}

function getUser (req, res, next){
  console.log('req body', req.body)
  var code = req.body.code
  User.findOne({code: code}).exec()
    .then(function(user){
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
  saveToDb(User, userGithubProfile)
    .then(function(user){
      user.tokens.github = null
      res.status(200).json({user: user})
    })
}

function save(type, data) {
  return saveToDb(model[type], data)
}

function deleteItem (type, idObj) {
  return deleteFromDb(model[type], idObj)
}

function fetch(type){
  return model[type].find({}).exec()
}


module.exports = {
  getUser : getUser,
  createUser : createUser,
  save : save,
  fetch : fetch,
  deleteItem: deleteItem
}