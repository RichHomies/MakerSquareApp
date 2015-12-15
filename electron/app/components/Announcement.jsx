
class Announcement extends React.Component {
  render() {
    var announcements = this.props.announcements.map(function(announcement, i){
      return (
        <li key={i} ><span> {announcement.userName} says : </span> {announcement.text} </li>
        )
    })
    return (
      <ol>{announcements}</ol>
    )
  }
}

export default Announcement;