const ipcRenderer = require('electron').ipcRenderer;
const HomeActions = require('../actions/HomeActions')
const HomeStore = require('../stores/HomeStore')

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
    console.log('we mounted')
    ipcRenderer.send('asynchronous-message', {type: 'request' ,method: 'GET', resource: 'githubToken'});
    ipcRenderer.on('asynchronous-reply', function(event, arg) {
      console.log('render process replied', arg)
      HomeActions.getUserData(arg.body)
    });
  }
  render() {
    console.log('window', Object.keys(document))
    return (
      <div>
        This is Home.
      </div>
    )
  }
}

export default Home;