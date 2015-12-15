var ASQ = require('asynquence')
var db = require('./controller/db')

function emitToClient(socket, type, data){
  socket.emit(type, data);
}


function setup(io){
  io.on('connection', function (socket) {
  console.log('connected! in setup');
    socket.on('getAnnouncementsLinks', function () {
      console.log('getting links and annoucnemtsn')
      ASQ("")
      .all( // or `.gate(..)`
          function(done,msg){
            db.fetch('link')
              .then(function(links){
                done(links)
              })  
          },
          function(done,msg){
            db.fetch('announcement')
              .then(function(announcements){
                done(announcements)
              })
          }
      )
      .val(function(links, announcements){
        console.log('fixing to emit');
        emitToClient(socket ,'linksAnnouncements', {announcements: announcements, links: links})
      });
            
    });

    socket.on('saveAnnouncementToDb', function (announcementObject) {
      console.log('save announcement to db', announcementObject);

      db.save('announcement', announcementObject)
        .then(function(data){
          console.log('success', data);
          return db.fetch('announcement');
        })
        .then(function(announcements){
          console.log('announcemnts', announcements)
          emitToClient(socket, 'allAnnouncementData', {announcements: announcements})
        })
        .catch(function(err){
          console.log('shit', err)
        })
        
    });

    socket.on('saveLinkToDb', function (linkObject) {
      console.log(linkObject);
      db.save('link', linkObject)
        .then(function(data){
          console.log('success', data);
          db.fetch('link')
            .then(function(links){
               emitToClient(socket,'allLinkData', {links:links})
            })
        })
        .catch(function(err){
          console.log('shit', err)
        })
    });

  });
}


module.exports = {
  setup : setup
}