var ASQ = require('asynquence')
var db = require('./controller/db')

function emitToClient(socket, type, data){
  socket.emit(type, data);
}


function setup(io){
  io.on('connection', function (socket) {
  
  console.log('connected! in setup');

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
        // emitToClient(socket ,'linksAnnouncements', {announcements: announcements, links: links})
      });
            
    });

    socket.on('saveAnnouncementToDb', function (announcementObj) {
      console.log('announcement', announcementObj);
      db.save('announcement', announcementObj)
        .then(function(data){
          console.log('success', data);
        })
        .catch(function(err){
          console.log('shit', err)
        })
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