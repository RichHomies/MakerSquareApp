var mongoose = require('mongoose');

var linksSchema = new mongoose.Schema({
    userName : String,
    userId : String,
    body : {
      text: {String, default: ''},
      url : {String , default: ''}
    },
    creationDate :  {type: Date, default: Date.now()}
});

module.exports = mongoose.model('linkModel', linksSchema);