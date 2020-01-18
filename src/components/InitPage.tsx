import { Component } from "preact";
import { route } from "preact-router";
import { ChromeLocalStorage } from "../services/chrome-local-storage";

export class InitPage extends Component {
  componentWillMount() {
    return ChromeLocalStorage.get('gitlab-token').then(token => {
      if (token == null) {
        const params = new URLSearchParams(location.search);
        sessionStorage.setItem('originTabId', params.get('active'));
        route(`/login?${ params.has('active') && 'standalone' }`);
      } else {
        route('/control-panel');
      }
    });
  }

  render() {
    return null;
  }
}
