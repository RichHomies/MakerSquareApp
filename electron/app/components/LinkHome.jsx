const LinkHomeActions = require('../actions/LinkHomeActions')
const LinkHomeStore = require('../stores/LinkHomeStore')
const Loader = require('react-loader');
const alt = require('../alt')
const moment = require('moment')
const shell = require('electron').shell;
const toastr = require('toastr')
const ipcRenderer = require('electron').ipcRenderer;

var firstTimeRendering = true

class LinkHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = LinkHomeStore.getState()
    this.onChange = this.onChange.bind(this);
  }
  onChange(state) {
    this.setState(state)
  }
  componentDidMount() {
    LinkHomeStore.listen(this.onChange)
    connectToSocketOnServer
      .then(function(status){
        if(status === 'connected!') {
          socket.on('allLinkData', function(links) {
            ipcRenderer.send('notification-inc', {type: 'link', initialCall: firstTimeRendering})
            LinkHomeActions.updateLinks(links)
            firstTimeRendering = false
          })
          LinkHomeActions.getLinks() //gets initial links
        }
      })
      .catch(function(err){
        console.log('error', err)
      })
  }

  componentWillUnmount () {
    LinkHomeStore.unlisten(this.onChange)
  }
  handleLinkSubmit(event) {
    event.preventDefault();
    var linkText = this.state.linkText.trim();
    var linkUrl = this.state.linkUrl.trim();
    var linkSubj = this.state.linkSubj.trim();
    var httpflag = linkUrl.indexOf('http://') !== 0
    var httpsflag = linkUrl.indexOf('https://') !== 0
    console.log('index of', linkUrl.indexOf('http://') !== 0)
    console.log('link url', linkUrl)
    if (!httpflag && (linkText && linkUrl && linkSubj)) { //if http not in there
      LinkHomeActions.postLink(linkText, linkUrl, linkSubj)
      return null
    }
    if (!httpsflag && (linkText && linkUrl && linkSubj)) {
      LinkHomeActions.postLink(linkText, linkUrl, linkSubj)
      return null
    }
    toastr.error('You need to add http:// to the url, Alex.')
    setTimeout(function() {
      toastr.error('...and Clippers suck.')
    }, 1500)
  }
  removeLink(link_id) {
    LinkHomeActions.removeLink(link_id)
  }
  openLink(linkurl) {
    console.log('linkurl', linkurl)
    shell.openExternal(linkurl)
  }

  render() {
    var that = this
    var adminPost = null
    if (alt.stores.HomeStore.state.studentOrAdmin === "student") {
      adminPost = <form className="ui form" >
            <div className="field">
              <label>Link Text</label>
              <input type="text" value={this.state.linkText} placeholder="Link Text" onChange={LinkHomeActions.updateLinkText} />
            </div>
            <div className="field">
              <label>Link Url</label>
              <input type="url" value={this.state.linkUrl} placeholder="Link Url" onChange={LinkHomeActions.updateLinkUrl} />
            </div>
            <div className="field">
              <label>Link Subject</label>
              <input type="text" value={this.state.linkSubj} placeholder="Link Text" onChange={LinkHomeActions.updateLinkSubj} />
            </div>
            <button className="ui submit button" onClick={this.handleLinkSubmit.bind(this)}>Submit Link</button>
          </form>
    }
    var links = this.state.links.map(function(link, i){
      return (
        <div key={i} className='event'>
          <div className="label">
            <img src={alt.stores.HomeStore.state.avatar_url} />
          </div>
          <div className="content">
            <div className="summary">
              <div className="user">
                {alt.stores.HomeStore.state.name}
              </div> posted a link: <div className="link" onClick={that.openLink.bind(this, link.url)}>{link.text}</div>
              <div className="date">
                {moment.utc(link.creationDate).format('MMM Do h:mmA')}
              </div>
              <button className="ui button" onClick={that.removeLink.bind(that, link._id)}>
              x
              </button>
            </div>
          </div>
        </div>
        )
    })
    return (
      <div className="six wide column">
        <Loader loaded={this.state.linkLoaded}>
          {adminPost}
          <div className="ui feed">{links}</div>
        </Loader>
      </div>
      )
  }
}

export default LinkHome;