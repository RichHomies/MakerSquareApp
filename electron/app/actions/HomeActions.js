import alt from '../alt';
import $ from 'jquery'

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
    let socket = io();
    console.log(announcement)
    socket.emit('saveAnnouncementToDb', announcement)
  }
  getLinksAndAnnouncements() {
    let socket = io();
    socket.emit('getAnnouncementsLinks');
    socket.on('linksAnnouncements', function(data) {
      if (data) {
        this.actions.getLinksAnnouncementsSuccess(data)
      } else {
        this.actions.getLinksAndAnnouncementsFail()
      }
    })
  }
}

export default alt.createActions(HomeActions);