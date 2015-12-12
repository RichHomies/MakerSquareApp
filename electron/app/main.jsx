'use babel';
import Router from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'))