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
    console.log('in actions')
    $.ajax({
      type:'POST',
      url:'http://localhost:8080/api/users',
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