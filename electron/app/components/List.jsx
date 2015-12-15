
class List extends React.Component {
  render() {
    var links = this.props.links.map(function(link, i){
      return (
        <li><a key={i} src={link.url}>{link.text}</a></li>
        )
    })
    return (
      <ol>{links}</ol>
    )
  }
}

export default List;