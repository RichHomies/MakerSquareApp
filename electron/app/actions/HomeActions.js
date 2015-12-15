import alt from '../alt';
import $ from 'jquery'
function formatAnnouncementObject(announcement, username, _id){
  return {
    text : announcement,
    userName : username,
    userId : _id
  }
}
function formatLinkObject(text, url, username, _id){
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
      'getLinksAnnouncementsSuccess',
      'getLinksAnnouncementsFail',
      'updateAnnouncementPost',
      'updateAnnouncements'

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
    var announcementObject = formatAnnouncementObject(announcement, alt.stores.HomeStore.state.name,alt.stores.HomeStore.state._id)
    socket.emit('saveAnnouncementToDb', announcementObject)
  }
  postLink(text, url) {    
    var linkObject = formatLinkObject(text, url, alt.stores.HomeStore.state.name, alt.stores.HomeStore.state._id)
    socket.emit('saveLinkToDb', linkObject)
  }
  getLinksAnnouncements(link) {
    console.log('getting links and announcements')
    var that = this;
    socket.on('linksAnnouncements', function(data) {
      if (data) {
        console.log('linksAnnouncements data', data);
        console.log('actions functions', that.actions);
        that.actions.getLinksAnnouncementsSuccess(data)
      } else {
        that.actions.getLinksAnnouncementsFail()
      }
    })
    socket.emit('getAnnouncementsLinks')
  }
}

export default alt.createActions(HomeActions);