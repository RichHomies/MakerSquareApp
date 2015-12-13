var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName : String,
    name: String,
    avatar_url: String,
    role : {
      studentOrAdminRights: {String, default: ''},
      cohort: {String , default: ''}
    },
    tokens: {
      github: {type: String, default: ''}
    },
    code: {String , default: ''},
    creationDate :  {type: Date, default: Date.now()}
});

module.exports = mongoose.model('userModel', userSchema);