var mongoose = require('mongoose');

var linksSchema = new mongoose.Schema({
    userName : String,
    userId : String,
    text: {type: String, default: ''},
    url : {type: String , default: ''},
    creationDate :  {type: Date, default: Date.now()}
});

module.exports = mongoose.model('linkModel', linksSchema);