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
    ipcRenderer.send('asynchronous-message', {type: 'request' ,method: 'GET', resource: 'githubToken'});
    ipcRenderer.on('asynchronous-reply', function(event, arg) {
      console.log('render process replied', arg)
      HomeActions.getUserData(arg.body)
    });
  }
  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }
  render() {
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          Hello!
        </Loader>
      </div>
    )
  }
}

export default Home;