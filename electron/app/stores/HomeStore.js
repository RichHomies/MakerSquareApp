import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
  }
  onGetUserDataSuccess(data) {
    console.log('SUCCESS', data)
  }
  onGetUserDataFail(errorMessage) {
    console.log('fail', errorMessage)
  }
}




export default alt.createStore(HomeStore);