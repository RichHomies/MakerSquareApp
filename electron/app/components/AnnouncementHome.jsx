const AnnouncementHomeActions = require('../actions/AnnouncementHomeActions')
const AnnouncementHomeStore = require('../stores/AnnouncementHomeStore')
const Loader = require('react-loader');
const alt = require('../alt')
const moment = require('moment')
const ipcRenderer = require('electron').ipcRenderer;

var firstTimeRendering = true

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
            AnnouncementHomeActions.updateAnnouncements(announcements)
            firstTimeRendering = false
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
    console.log('admin status', alt.stores.HomeStore.state.studentOrAdmin);
    var announcementForm = alt.stores.HomeStore.state.studentOrAdmin !== 'admin' ? null : (
          <form className="ui form" >
              <div className="field">
                <label>Announcement Text</label>
                <input type="text" value={this.state.announcementText} placeholder="Announcement Text" onChange={AnnouncementHomeActions.updateAnnouncementText} />
              </div>
              <button className="ui submit button" onClick={this.handleAnnouncementSubmit.bind(this)}>Submit Announcement</button>
            </form>
            )


    var announcements = this.state.announcements.map(function(announcement, i){
      
      var deleteBtn = alt.stores.HomeStore.state.studentOrAdmin !== "admin" ?  null : (<button className="ui button" onClick={that.removeAnnouncement.bind(that, announcement._id)}>
                x
                </button>);
      return (
        <div key={i} className='event'>
          {deleteBtn}
          <div className="label">
            <img src={announcement.avatar_url} /> 
          </div>
          <div className="content">
            <div className="summary">
              {announcement.text}
              <div className="date">
                {moment.utc(announcement.creationDate).format('MMM Do h:mmA')}
              </div>
            </div>
          </div>
        </div>
        )
    })

    return (

      <div id='announcementsContainer'>
        <div id="announcements">
          <Loader loaded={this.state.announcementLoaded}>
          {announcementForm}
            <div><h3>Announcements</h3></div>
            <div className="ui feed">{announcements}</div>
          </Loader>
        </div>
      </div>
      )
  }

}export default AnnouncementHome;