const ipcRenderer = require('electron').ipcRenderer;
const HomeActions = require('../actions/HomeActions')
const HomeStore = require('../stores/HomeStore')
const Loader = require('react-loader');

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
    HomeActions.getLinksAndAnnouncements()
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
          Hello {this.state.name}! Here is your profile picture:
          <img className="ui avatar image" src={this.state.avatar_url}></img>
          <span>{this.state.username}</span>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input value={this.state.announcementPost} onChange={HomeActions.updateAnnouncementPost}></input>
            <button type="submit">Submit</button>
          </form>
        </Loader>
      </div>
    )
  }
}

export default Home;