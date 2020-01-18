import { h, render } from 'preact';
import { Router } from 'preact-router';

import 'bulma/css/bulma.min.css';
import './styles.scss';

import { InitPage } from './components/InitPage';
import { DashboardPage } from './components/DashboardPage';
import { LoginPage } from './components/Login';
import { LoginSuccessPage } from './components/LoginSuccess';

const App = () => (
  <Router>
    <InitPage default />
    <DashboardPage path="/control-panel" />
    <LoginPage path="/login" />
    <LoginSuccessPage path="/login-success" />
  </Router>
);

render(<App />, document.getElementById('root'));
