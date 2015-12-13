import alt from '../alt';
class HomeActions {
  constructor() {
    this.generateActions(
      'getAnnouncementsSuccess',
      'getAnnouncementsFail',
      'getLinksSuccess',
      'getLinksFail'
      )
  }
}

export default alt.createActions(HomeActions);