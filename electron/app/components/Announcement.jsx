
class Announcement extends React.Component {
  render() {
    var announcements = this.props.announcements.map(function(announcement){
      return (
        <li><span> {announcement.userName} says : </span> {announcement.text} </li>
        )
    })
    return (
      <ol>{announcements}</ol>
    )
  }
}

export default Announcement;