var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName : String,
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

modules.exports = mongoose.model('userModel', userSchema);