var mongoose = require('mongoose');

var linksSchema = new mongoose.Schema({
    userName : String,
    userId : String,
    subject: String,
    text: {type: String, default: ''},
    url : {type: String , default: ''},
    avatar_url : String,
    creationDate :  {type: Date, default: Date.now()}
});

module.exports = mongoose.model('linkModel', linksSchema);