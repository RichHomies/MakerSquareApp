import alt from '../alt';
import $ from 'jquery'

class HomeActions {
  constructor() {
    this.generateActions(
      'getUserDataSuccess',
      'getUserDataFail'
      )
  }
  getUserData(code) {
    $.ajax({
      type:'POST',
      url:'http://54.201.227.250/api/users',
      data: { code: code }
    })
    .done((data) => {
      this.actions.getUserDataSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.getUserDataFail(jqXhr.responseJSON.message);
    })
  }
}

export default alt.createActions(HomeActions);