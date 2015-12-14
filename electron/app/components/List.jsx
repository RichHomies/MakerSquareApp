
class List extends React.Component {
  render() {
    var links = this.props.links.map(function(link){
      return (
        <li><a src={link.url}>{link.text}</a></li>
        )
    })
    return (
      <ol>{links}</ol>
    )
  }
}

export default List;