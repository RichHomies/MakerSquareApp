var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName : String,
    name: String,
    avatar_url: String,
    role : {
      studentOrAdminRights: {type: String, default: ''},
      cohort: {type: String , default: ''}
    },
    githubId: Number,
    creationDate :  {type: Date, default: Date.now()}
});

module.exports = mongoose.model('userModel', userSchema);
