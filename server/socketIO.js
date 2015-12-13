var ASQ = require('asynquence')
var db = require('./controller/db')

function emitToClient(type, data){
  socket.emit(type, data);
}


function setup(io){
  io.on('connection', function (socket) {
  
    socket.on('getAnnouncementsLinks', function (data) {
      ASQ("")
      .all( // or `.gate(..)`
          function(done,msg){
            fetch('link')
              .then(function(links){
                done(links)
              })  
          },
          function(done,msg){
            fetch('announcement')
              .then(function(announcements){
                done(announcements)
              })
          }
      )
      .val(function(links, announcements){
        //emit to client
        emitToClient('linksAnnouncements', {announcements: announcements, links: links})
      });
            
    });

    socket.on('saveAnnouncementToDb', function (data) {
      console.log(data);
      db.save('announcement', data);
    });

    socket.on('saveLinkToDb', function (data) {
      console.log(data);
      db.save('link', data);
    });

  });
}


module.exports = {
  setup : setup
}