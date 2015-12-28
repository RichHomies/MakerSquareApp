import alt from '../alt';

function formatAnnouncementObject(announcement, username, _id, avatar_url){
  return {
    text : announcement,
    userName : username,
    userId : _id,
    avatar_url : avatar_url
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
    var announcementObject = formatAnnouncementObject(text, alt.stores.HomeStore.state.name, alt.stores.HomeStore.state._id, alt.stores.HomeStore.state.avatar_url)
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