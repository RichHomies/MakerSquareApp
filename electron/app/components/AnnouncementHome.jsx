const ipcRenderer = require('electron').ipcRenderer;
const AnnouncementHomeActions = require('../actions/AnnouncementHomeActions')
const AnnouncementHomeStore = require('../stores/AnnouncementHomeStore')
const Loader = require('react-loader');
const alt = require('../alt')
const moment = require('moment')

class AnnouncementHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = AnnouncementHomeStore.getState()
    this.onChange = this.onChange.bind(this)
  }
  onChange(state) {
    this.setState(state)
  }
  componentDidMount() {
    AnnouncementHomeStore.listen(this.onChange)
    connectToSocketOnServer
      .then(function(status){
        if(status === 'connected!') {
          socket.on('allAnnouncementData', function(announcements) {
            console.log('updating announcements', announcements)
            AnnouncementHomeActions.updateAnnouncements(announcements)
          })
          AnnouncementHomeActions.getAnnouncements() //gets initial announcements
        }
      })
      .catch(function(err){
        console.log('error', err)
      })
  }
  componentWillUnmount () {
    AnnouncementHomeStore.unlisten(this.onChange)
  }
  handleAnnouncementSubmit (event) {
    event.preventDefault()
    var announcementText = this.state.announcementText.trim()
    if (announcementText) {
      AnnouncementHomeActions.postAnnouncement(announcementText)
    }
  }
  removeAnnouncement(announcementId) {
    AnnouncementHomeActions.removeAnnouncement(announcementId)
  }
  render() {
    var that = this
    var announcements = this.state.announcements.map(function(announcement, i){
      return (
        <div key={i} className='event'>
          <div className="label">
            <img src={alt.stores.HomeStore.state.avatar_url} />
          </div>
          <div className="content">
            <div className="summary">
              <div className="user">
                {alt.stores.HomeStore.state.name}
              </div> posted a announcement: {announcement.text}
              <div className="date">
                {moment.utc(announcement.creationDate).format('MMM Do h:mmA')}
              </div>
              <button className="ui button" onClick={that.removeAnnouncement.bind(that, announcement._id)}>
              x
              </button>
            </div>
          </div>
        </div>
        )
    })
    return (
      <div className="six wide column">
        <Loader loaded={this.state.announcementLoaded}>
          <form className="ui form" >
            <div className="field">
              <label>Announcement Text</label>
              <input type="text" value={this.state.announcementText} placeholder="Announcement Text" onChange={AnnouncementHomeActions.updateAnnouncementText} />
            </div>
            <button className="ui submit button" onClick={this.handleAnnouncementSubmit.bind(this)}>Submit Announcement</button>
          </form>

          <div className="ui feed">{announcements}</div>
        </Loader>
      </div>
      )
  }

}export default AnnouncementHome;