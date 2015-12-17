import alt from '../alt';

function formatLinkObject(text, url, username, _id){
  return {
    text : text,
    url: url,
    userName : username,
    userId : _id
  }
}

class LinkHomeActions {
  constructor() {
    this.generateActions(
      'updateLinkText',
      'updateLinkUrl',
      'updateLinks'
      )
  }
  postLink(text, url) {    
    var linkObject = formatLinkObject(text, url, alt.stores.HomeStore.state.name, alt.stores.HomeStore.state._id)
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