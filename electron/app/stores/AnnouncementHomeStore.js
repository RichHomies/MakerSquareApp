import alt from '../alt';
import AnnouncementHomeActions from '../actions/AnnouncementHomeActions';
const ipcRenderer = require('electron').ipcRenderer;

class AnnouncementHomeStore {
  constructor() {
    this.bindActions(AnnouncementHomeActions)
    this.announcements = []
    this.announcementText = ''
    this.announcementLoaded = false
  }
  onUpdateAnnouncementText (event) {
    this.announcementText = event.target.value
  }
  onUpdateAnnouncements(announcements) {
    ipcRenderer.send('notification-inc', {type: 'announcement'})
    this.announcements = announcements.announcements.reverse()
    this.announcementText = ''
    this.announcementLoaded = true
  }
}

export default alt.createStore(AnnouncementHomeStore)