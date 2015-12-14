import alt from '../alt';
import $ from 'jquery'
function formatAnnouncementObject(announcement, username, _id){
  return {
    text : announcement,
    userName : username,
    _id : _id
  }
}

class HomeActions {
  constructor() {
    this.generateActions(
      'getUserDataSuccess',
      'getUserDataFail',
      'getLinksAndAnnouncementsSuccess',
      'getLinksAndAnnouncementsFail',
      'updateAnnouncementPost'
      )
  }
  getUserData(code) {
    console.log('in actions')
    $.ajax({
      type:'POST',
      url:'http://localhost:8080/api/users',
      data: { code: code }
    })
    .done((data) => {
      this.actions.getUserDataSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.getUserDataFail(jqXhr.responseJSON.message);
    })
  }
  postAnnouncement(announcement) {    
    var announcementObj = formatAnnouncementObject(announcement, alt.stores.HomeStore.state.name,alt.stores.HomeStore.state._id)
    socket.emit('saveAnnouncementToDb', announcementObj)
  }
  getLinksAndAnnouncements(link) {
    console.log('getting links and announcements')
    socket.on('linksAnnouncements', function(data) {
      if (data) {
        console.log('linksAnnouncements data', data);
        this.actions.getLinksAnnouncementsSuccess(data)
      } else {
        this.actions.getLinksAndAnnouncementsFail()
      }
    })
    socket.emit('getAnnouncementsLinks')
  }
}

export default alt.createActions(HomeActions);