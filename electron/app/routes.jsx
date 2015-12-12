'use-babel';
import {Route} from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Home from './components/Home';

export default (
  <Route component={App}>
    <Route path='/' component={Login} />
    <Route path='home' component={Home} />
    <Route path='home' component={Home} />
    
  </Route>
  )