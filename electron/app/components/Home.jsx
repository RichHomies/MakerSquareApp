const ipcRenderer = require('electron').ipcRenderer;

class Home extends React.Component {
  componentDidMount() {
    ipcRenderer.send('asynchronous-message', {type: 'request' ,method: 'GET', resource: 'githubToken'});

    ipcRenderer.on('asynchronous-reply', function(event, arg) {
      console.log(arg); // prints "pong"
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