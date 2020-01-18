import { h, Component } from "preact";
import { Icon } from "./Icon";
import './LoginSuccess.scss';

type LoginSuccessPageProps = unknown;
type LoginSuccessPageState = { timeElapsed: number };

export class LoginSuccessPage extends Component<LoginSuccessPageProps, LoginSuccessPageState> {
  constructor() {
    super();
    this.state = {
      timeElapsed: 4
    };

    const timeElapsedTimerId = setInterval(() => {
      if (this.state.timeElapsed > 0) {
        this.setState({
          timeElapsed: this.state.timeElapsed -1
        })
      } else {
        clearInterval(timeElapsedTimerId);
        this.closeExtensionTab();
      }
    }, 1000);

  }

  closeExtensionTab = () => {
    const originTabId = Number(sessionStorage.getItem('originTabId'));

    chrome.tabs.update(originTabId, { highlighted: true }, () => {
      if (chrome.runtime.lastError != null) {
        return console.error(chrome.runtime.lastError);
      }

      window.close();
    });
  }

  render() {
    return <div className="section login-success-page">
      <div className="container">
        <p className="hint">
          You'll be redirected to the Control Panel in {this.state.timeElapsed} seconds.<br/>
          Click on the button below to proceed 🚀
        </p>
        <button onClick={this.closeExtensionTab} className="button is-success login-success">
          <Icon id="checkmark" options={({ width: 16, height: 16 })} /> Login success
        </button>
      </div>
    </div>
  }
}
