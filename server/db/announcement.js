var mongoose = require('mongoose');

var announcementSchema = new mongoose.Schema({
    userName : String,
    userId : String,
    body : {
      text: {String, default: ''},
      url : {String , default: ''}
    },
    creationDate :  {type: Date, default: Date.now()}
});

modules.exports = mongoose.model('announcementModel', announcementSchema);