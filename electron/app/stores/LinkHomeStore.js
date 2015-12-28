import alt from '../alt';
import LinkHomeActions from '../actions/LinkHomeActions';
const ipcRenderer = require('electron').ipcRenderer;


class LinkHomeStore {
  constructor() {
    this.bindActions(LinkHomeActions)
    this.links = []
    this.subjects = []
    this.linkText = ''
    this.linkUrl = ''
    this.linkSubj = ''
    this.linkLoaded = false
  }
  onUpdateLinkText (event) {
    this.linkText = event.target.value
  }
  onUpdateLinkUrl(event) {
    this.linkUrl = event.target.value
  }
  onUpdateLinkSubj(event) {
    this.linkSubj = event.target.value
  }
  onUpdateLinks(links) {
    ipcRenderer.send('notification-inc', {type: 'link'})
    this.links = links.links.reverse()
    var subjectObj = {}
    for (var link in this.links) {
      subjectObj[this.links[link].subject] = link.subject
    }
    this.subjects = Object.keys(subjectObj)
    this.linkText = ''
    this.linkUrl = ''
    this.linkSubj = ''
    this.linkLoaded = true
  }
}

export default alt.createStore(LinkHomeStore)