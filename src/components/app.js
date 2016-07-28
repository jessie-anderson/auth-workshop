import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.onGoogleLogin = this.onGoogleLogin.bind(this);
    this.renderGoogle = this.renderGoogle.bind(this);

    this.state = {
      google: false,
      googleName: '',
      googleEmail: '',
      googleImage: '',
    };
  }

  // What happens after someone logs in
  onGoogleLogin(response) {
    if (response) {
      const user = response.getBasicProfile();
      this.setState({
        google: true,
        googleName: user.getName(),
        googleEmail: user.getEmail(),
        googleImage: user.getImageUrl(),
      });
    }
  }

  onFacebookLogin(response) {
    if ((response.status !== 'not_authorized') && (response.status !== 'unknown')) {
      document.getElementById('facebook').innerHTML = `Welcome, ${response.name}! `;
      document.getElementById('facebook').innerHTML += `<img src="${response.picture.data.url}"/>`;
      document.getElementById('facebook').style = 'display: block';
    } else {
      document.getElementById('facebook').style = 'display: block';
    }
  }

  renderGoogle() {
    if (this.state.google) {
      return (
        <div>
          <ul>
            <li>Thanks for logging in! </li>
            <li>Your Name: {this.state.googleName}</li>
            <li>Your Email: {this.state.googleEmail}</li>
            <li>Your Photo: <img src={this.state.googleImage} alt="N/A" /></li>
          </ul>
        </div>
      );
    } else {
      return (
        <GoogleLogin
          clientId="1091275465025-ovrk27slre09jtokarj4b8ltihpurlb9.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          callback={this.onGoogleLogin}
        />
      );
    }
  }

  render() {
    // Add in FacebookLogin, GoogleLogin and FirebaseApp
    return (
      <div id="login">
        <div id="facebook">
          <FacebookLogin
            appId="1712734762324670"
            autoLoad
            fields="name,email,picture.type(large)"
            callback={this.onFacebookLogin}
          />
        </div>
        <div id="google">
          {this.renderGoogle()}
        </div>
      </div>
    );
  }
}

export default App;
