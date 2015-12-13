import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.loaded = false;
    this.announcements = [];
    this.links = [];
    this.username = ''
    this.avatar_url = ''
    this.name = ''
    this.roles = ''
    this.announcementPost
  }
  onGetUserDataSuccess(data) {
    console.log('SUCCESS', data)
    this.username = data.user.username
    this.name = data.user.name
    this.avatar_url = data.user.avatar_url
    this.loaded = true;
  }
  onGetUserDataFail(errorMessage) {
    console.log('fail', errorMessage)
  }
  onGetLinksAndAnnouncementsSuccess(data) {
    console.log(data)
    this.links = data.links
    this.announcements = data.announcements
  }
  onGetLinksAndAnnouncementsFail() {
    console.log('UH OH')
  }
  onUpdateAnnouncementPost(event) {
    this.announcementPost = event.target.value
  }
}




export default alt.createStore(HomeStore);