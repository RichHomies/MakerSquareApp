import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.loaded = false;
  }
  onGetUserDataSuccess(data) {
    console.log('SUCCESS', data)
    this.loaded = true;
  }
  onGetUserDataFail(errorMessage) {
    console.log('fail', errorMessage)
  }
}




export default alt.createStore(HomeStore);