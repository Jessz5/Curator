import React from 'react';
import { Link } from 'react-router-dom';
import "../SignUp.css";
import {Redirect} from 'react-router';
import Logo from './Logo';


export default class LogInBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          sessiontoken: ""
        };
    }

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

    // when the user hits submit, process the login through the API
    submitHandler = event => {
        //keep the form from actually submitting
        event.preventDefault();

        //make the api call to the authentication page
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log("Testing");
                    console.log(result);
                    if (result.userID) {

                        // set the auth token and user ID in the session state
                        sessionStorage.setItem("token", result.token);
                        sessionStorage.setItem("user", result.userID);

                        this.setState({
                            sessiontoken: result.token,
                        });
                    } else {

                        // if the login failed, remove any infomation from the session state
                        sessionStorage.removeItem("token");
                        sessionStorage.removeItem("user");
                        this.setState({
                            sessiontoken: "",
                        });
                    }
                },
                error => {
                    alert("Invalid username or password!");
                }
            );
    };


    render() {

        if (!sessionStorage.getItem("token")) {
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
                <div className="FormBody">
                    <form className="filler" onSubmit={this.submitHandler}>
                        <label className="login">
                            <input id="UserName" className="login" type="text" placeholder="Username"
                                onChange={this.myChangeHandler}/>
                        </label>
                        <br/>
                        <label className="login1">
                            <input id="PassWord" className="" type="password" placeholder="Password"
                                onChange={this.passwordChangeHandler}/>
                        </label>
                        <input type="submit" value="Log In"/>
                    </form>
                </div>
            </div>);}
        else{return (<Redirect to = "/linkSpotify"/>)}
    }
}


