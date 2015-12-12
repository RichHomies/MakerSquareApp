var User = require('../db/user')
var Links = require('../db/links')
var Announcements = require('../db/announcement')
var mongoose = require('mongoose')
var ASQ = require('ASQ')


function getUser (code, done){
  User.findOne({code: code}, function(err, data){
    if(!err){
      done(data)
    } else {
      done.fail(err)
    }
  })
}









module.exports = {

}