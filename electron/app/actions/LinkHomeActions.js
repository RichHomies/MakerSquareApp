import alt from '../alt';

function formatLinkObject(text, url, subj, username, _id){
  return {
    text : text,
    url: url,
    subject: subj,
    userName : username,
    userId : _id
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
    var linkObject = formatLinkObject(text, url, subj, alt.stores.HomeStore.state.name, alt.stores.HomeStore.state._id)
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