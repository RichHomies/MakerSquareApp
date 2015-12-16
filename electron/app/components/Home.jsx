const ipcRenderer = require('electron').ipcRenderer;
const HomeActions = require('../actions/HomeActions')
const HomeStore = require('../stores/HomeStore')
const Loader = require('react-loader');
const List = require('./List');
const Announcement = require('./Announcement');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  onChange(state) {
    this.setState(state)
  }
  componentDidMount() {
    HomeStore.listen(this.onChange);
    connectToSocketOnServer
      .then(function(status){
        if(status === 'connected!') {
          HomeActions.getLinksAnnouncements()
          socket.on('allAnnouncementData', function(announcements){
            HomeActions.updateAnnouncements(announcements)
          })
        }
      })
      .catch(function(err){
        console.log('error', err)
      })
    ipcRenderer.send('asynchronous-message', {type: 'request' ,method: 'GET', resource: 'githubToken'});
    ipcRenderer.on('asynchronous-reply', function(event, arg) {
      console.log('render process replied', arg)
      HomeActions.getUserData(arg.body)
    });
  }
  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }
  handleSubmit(event) {
    event.preventDefault();
    var announcementPost = this.state.announcementPost.trim();
    if (announcementPost) {
      HomeActions.postAnnouncement(announcementPost)
    }
  }
  render() {
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <div className="ui left demo vertical visible inverted sidebar labeled icon menu">
            <a className="item">
              <img className="ui avatar image" src={this.state.avatar_url}></img>
              {this.state.username}
            </a>
            <a className="item">
              <i className="block layout icon"></i>
              Topics
            </a>
            <a className="item">
              <i className="smile icon"></i>
              Friends
            </a>
          </div>

          <div className="pusher">
            <div className="ui grid">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input value={this.state.announcementPost} onChange={HomeActions.updateAnnouncementPost}></input>
              <button type="submit">Submit</button>
            </form>
            <List links={this.state.links}></List>
            <Announcement announcements={this.state.announcements}></Announcement>
            </div>

          </div>
        

        </Loader>
      </div>
    )
  }
}

export default Home;