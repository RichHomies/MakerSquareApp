import alt from '../alt';
import LinkHomeActions from '../actions/LinkHomeActions';

class LinkHomeStore {
  constructor() {
    this.bindActions(LinkHomeActions)
    this.links = []
    this.linkText = ''
    this.linkUrl = ''
    this.linkLoaded = false
  }
  onUpdateLinkText (event) {
    this.linkText = event.target.value
  }
  onUpdateLinkUrl(event) {
    this.linkUrl = event.target.value
  }
  onUpdateLinks(links) {
    this.links = links.links.reverse()
    this.linkText = ''
    this.linkUrl = ''
    this.linkLoaded = true
  }
}

export default alt.createStore(LinkHomeStore)