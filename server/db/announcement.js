var mongoose = require('mongoose');

var announcementSchema = new mongoose.Schema({
    userName : String,
    userId : String,
    body : {
      text: {type: String, default: ''},
      url : {type: String , default: ''}
    },
    creationDate :  {type: Date, default: Date.now()}
});

module.exports = mongoose.model('announcementModel', announcementSchema);