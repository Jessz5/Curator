import React from "react";
import "../App.css";
import "../darkpages.css";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Logo from './Logo';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      verify: ""
    };

  }

  // change handlers keep the state current with the values as you type them, so
  // the signup handler can read from the state to hit the API layer
  myChangeHandler = event => {
    this.setState({
      username: event.target.value
    });
  };


  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    });
  };

  verifyPasswordChangeHandler = event => {
    this.setState({
      verify: event.target.value
    });
  };


  signUp = event => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //If the email and password fields are properly populated, continue processing, else return error
    if(this.state.username != "" && this.state.password != "" && this.state.password == this.state.verify){
      var raw = JSON.stringify(
          {"email":this.state.username,
            "password":this.state.password
          });


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };


      //make the api call to the authentication page
      fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/auth/signup", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then(this.props.history.push("/logInBanner"))
          .catch(error => console.log('error', error));
    }
    else{
      alert("Please make sure the username and password fields are properly filled in");
    }
  };


  render() {
    return (
        <div id="LoginHeader">
          <div className="Dark-Header">
            <Logo/>
          </div>
          <div className="LoginSignupBody">
            <div className="BannerOn">
              <Link to="/LogInBanner">Log In</Link>
            </div>
            <div className="BannerOff">
              <Link to="/SignUpForm">Sign Up</Link>
            </div>
          </div>
          <header className="Signup_CSS">

            <form>
              <label>
                <div className="fields">
                Username
                </div>
              <input
                  className="Username"
                     type="text"
                  onChange={this.myChangeHandler}
              />
                <br /><br /><br />
              </label>
              <label>
                <div className="fields">
                Password
                </div>
              <input
                  className="password"
                  type="password"
                  onChange={this.passwordChangeHandler}
              />
              <br /><br /><br />
            </label>
              <label>
                <div className="fields">
                  Verify Password
                </div>
                <input
                    className="password"
                    type="password"
                    onChange={this.verifyPasswordChangeHandler}
                />
                <br /><br /><br />
              </label>
              <div className="button_signup">
              <button className="SignupButton" onClick={this.signUp}>Sign Up</button>
              </div>
            </form>
          </header>
        </div>
    );
  }
}