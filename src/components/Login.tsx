import { h, Component } from 'preact';
import { route } from 'preact-router';

import { ChromeLocalStorage } from '../services/chrome-local-storage';

import './Login.scss';

type LoginPageProps = unknown;

type LoginPageState = {
  tokenFormValue: string;
  isStandlone: boolean;
}

export class LoginPage extends Component<LoginPageProps, LoginPageState> {
  public state = {
    tokenFormValue: '',
    isStandlone: false
  };

  componentWillMount() {
    const params = new URLSearchParams(location.search);
    this.setState({ isStandlone: params.has('standalone') });
  }

  handleLoginClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([activateTab] = []) => {
      chrome.tabs.create({
        url: `index.html?active=${ activateTab.id }`
      });
    });
  }

  handleTokenSubmit = (event: Event) => {
    event.preventDefault();

    ChromeLocalStorage
      .set('gitlab-token', this.state.tokenFormValue)
      .then(() => route('/login-success'))
  }

  handleInput = (event: InputEvent) => {
    this.setState({
      tokenFormValue: event.target['value']
    });
  }

  render() {
    if (!this.state.isStandlone) {
      return (
        <div className="section">
          <div className="container login-container">
            <button
              onClick={this.handleLoginClick}
              className="button is-link"
              type="button">
              Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="section">
        <div className="container login-container">
          <div class="card login-card">
            <div class="card-content">
              <p>Before using the extension, please enter your Gitlab Personal Token. So we could get permissions to access your projects</p>

              <form onSubmit={this.handleTokenSubmit}>
                <div class="field">
                  <label for="token" class="label">Gitlab Personal Token</label>
                  <input
                    type="text"
                    autocomplete="off"
                    className="input"
                    id="token"
                    required />
                </div>

                <button
                  type="submit"
                  className="button">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
