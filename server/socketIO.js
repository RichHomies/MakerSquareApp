var ASQ = require('asynquence')
var db = require('./controller/db')

function emitToClient(socket, type, data){
  socket.emit(type, data);
  socket.broadcast.emit(type, data);
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
        emitToClient(socket ,'linksAnnouncements', {announcements: announcements, links: links})
      });
            
    });

    socket.on('getLinks', function () {
      console.log('tryna get links')
      ASQ(function(done){
          db.fetch('link')
            .then(function(links){
              done(links)
            })  
        })
      .then(function(done, links){
        console.log('emitting links', links)
        emitToClient(socket,'allLinkData', {links:links})
      });
            
    });

    socket.on('saveLinkToDb', function (linkObject) {
      console.log('save link to DB called, heres linkObject', linkObject)
      db.save('link', linkObject)
        .then(function(data){
          return db.fetch('link')  
        })
        .then(function(links){
          emitToClient(socket,'allLinkData', {links:links})
        })
    });

    socket.on('deleteLink', function(linkIdObj) {
      console.log('deleteLink fired', linkIdObj)
      db.deleteItem('link', linkIdObj)
        .then(function(done) {
          db.fetch('link')
            .then(function(links){
              console.log('links', links)
              //do something with these links. maybe use ASQ so we can
              //emit back the updated links back to the client?
              emitToClient(socket,'allLinkData', {links:links})
            })  
        })
    })

    socket.on('getAnnouncements', function () {
      ASQ(function(done){
          db.fetch('announcement')
            .then(function(announcements){
              done(announcements)
            })  
        })
      .then(function(done, announcements){
        console.log('emitting announcement', announcements)
        emitToClient(socket,'allAnnouncementData', {announcements:announcements})
      });
            
    });
    socket.on('saveAnnouncementToDb', function (announcementObject) {
      db.save('announcement', announcementObject)
        .then(function(data){
          return db.fetch('announcement');
        })
        .then(function(announcements){
          emitToClient(socket, 'allAnnouncementData', {announcements: announcements})
        })        
    });

    socket.on('deleteAnnouncement', function(announcementIdObj) {
      console.log('deleteAnnouncement fired', announcementIdObj)
      db.deleteItem('announcement', announcementIdObj)
        .then(function(done) {
          db.fetch('announcement')
            .then(function(announcements){
              console.log('announcements', announcements)
              //do something with these announcements. maybe use ASQ so we can
              //emit back the updated announcements back to the client?
              emitToClient(socket,'allAnnouncementData', {announcements:announcements})
            })  
        })
    })

    

  });
}


module.exports = {
  setup : setup
}
