const ipcRenderer = require('electron').ipcRenderer;
const LinkHomeActions = require('../actions/LinkHomeActions')
const LinkHomeStore = require('../stores/LinkHomeStore')
const Loader = require('react-loader');
const alt = require('../alt')
const moment = require('moment')




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
    console.log('mounted')
    LinkHomeStore.listen(this.onChange)
    connectToSocketOnServer
      .then(function(status){
        console.log('connected in linkHome', status)
        if(status === 'connected!') {
          socket.on('allLinkData', function(links) {
            console.log('updating links', links)
            LinkHomeActions.updateLinks(links)
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
    console.log('fired')
    event.preventDefault();
    var linkText = this.state.linkText.trim();
    var linkUrl = this.state.linkUrl.trim();
    if (linkText && linkUrl) {
      LinkHomeActions.postLink(linkText, linkUrl)
    }
  }
  removeLink(link_id) {
    console.log('link_id', link_id)
    LinkHomeActions.removeLink(link_id)
  }
  render() {
    var that = this
    var links = this.state.links.map(function(link, i){
      return (
        <div key={i} className='event'>
          <div className="label">
            <img src={alt.stores.HomeStore.state.avatar_url} />
          </div>
          <div className="content">
            <div className="summary">
              <a className="user">
                {alt.stores.HomeStore.state.name}
              </a> posted a link: <a href={link.url}>{link.text}</a>
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
          <form className="ui form" >
            <div className="field">
              <label>Link Text</label>
              <input type="text" value={this.state.linkText} placeholder="Link Text" onChange={LinkHomeActions.updateLinkText} />
            </div>
            <div className="field">
              <label>Link Url</label>
              <input type="url" value={this.state.linkUrl} placeholder="Link Url" onChange={LinkHomeActions.updateLinkUrl} />
            </div>
            <button className="ui submit button" onClick={this.handleLinkSubmit.bind(this)}>Submit Link</button>
          </form>

          <div className="ui feed">{links}</div>
        </Loader>
      </div>
      )
  }
}

export default LinkHome;