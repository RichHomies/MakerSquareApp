import alt from '../alt';
const ipcRenderer = require('electron').ipcRenderer;

function formatLinkObject(text, url, subj, username, _id, avatar_url){
  return {
    text : text,
    url: url,
    subject: subj,
    userName : username,
    userId : _id,
    avatar_url : avatar_url
  }
}

class LinkHomeActions {
  constructor() {
    this.generateActions(
      'updateLinkText',
      'updateLinkUrl',
      'updateLinkSubj',
      'updateLinks'
      )
  }
  postLink(text, url, subj) {    
    ipcRenderer.send('notification-inc', {type: 'link'})
    var linkObject = formatLinkObject(text, url, subj, alt.stores.HomeStore.state.name, alt.stores.HomeStore.state._id, alt.stores.HomeStore.state.avatar_url)
    socket.emit('saveLinkToDb', linkObject)
  }
  getLinks() {
    socket.emit('getLinks')
  }
  removeLink(linkID) {
    socket.emit('deleteLink', {id: linkID})
  }
}

export default alt.createActions(LinkHomeActions);