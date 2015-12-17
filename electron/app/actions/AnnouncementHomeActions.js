import alt from '../alt';

function formatAnnouncementObject(announcement, username, _id){
  return {
    text : announcement,
    userName : username,
    userId : _id
  }
}

class AnnouncementHomeActions {
  constructor() {
    this.generateActions(
      'updateAnnouncementText',
      'updateAnnouncements'
      )
  }
  postAnnouncement(text) {    
    var announcementObject = formatAnnouncementObject(text, alt.stores.HomeStore.state.name, alt.stores.HomeStore.state._id)
    socket.emit('saveAnnouncementToDb', announcementObject)
  }
  getAnnouncements() {
    socket.emit('getAnnouncements')
  }
  removeAnnouncement(announcementID) {
    socket.emit('deleteAnnouncement', {id: announcementID})
  }
}

export default alt.createActions(AnnouncementHomeActions);