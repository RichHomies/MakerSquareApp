import {Link} from 'react-router'
class Home extends React.Component {
  render() {
    return (
      <div>
        This is Home.
        <Link to="/"> Go to Login</Link>
      </div>
    )
  }
}

export default Home;