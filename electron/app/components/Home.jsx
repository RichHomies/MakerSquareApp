const ipcRenderer = require('electron').ipcRenderer;
const HomeActions = require('../actions/HomeActions')
const HomeStore = require('../stores/HomeStore')
const Loader = require('react-loader');
const LinkHome = require('./LinkHome')
const AnnouncementHome = require('./AnnouncementHome')

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
    ipcRenderer.send('asynchronous-message', {type: 'request' ,method: 'GET', resource: 'githubToken'});
    ipcRenderer.on('asynchronous-reply', function(event, arg) {
      console.log('render process replied', arg)
      HomeActions.getUserData(arg.code)
    });
  }
  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }
  
  render() {
    var announcements = this.state.announcements.map(function(announcement, i){
      return (
        <li key={i} ><span> {announcement.userName} says : </span> {announcement.text} </li>
        )
    })
    
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <div className="ui left demo attached vertical visible inverted sidebar labeled icon menu">
            <a className="item">
              <img className="ui avatar image" src={this.state.avatar_url}></img>
              {this.state.username}
            </a>
          </div>

          <div id="container">
              <LinkHome />
              <AnnouncementHome />
          </div>
        

        </Loader>
      </div>
    )
  }
}

export default Home;