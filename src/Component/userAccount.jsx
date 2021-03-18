import React, {Component} from 'react';
// import './App.css';
import profile_photo from './profile_photo.jpg'
import my_tracks from './my_tracks.jpg'
import playlist from './playlist.png'
import './user_account_style.css'
import settings from "./settings";
import {Link} from "react-router-dom";
import HomeIcon from "../App";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


class userAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            favoritesong: "",
            status : "",
            responseMessage: ""
        };
        this.fieldChangeHandler.bind(this);
    }

    fieldChangeHandler(field, e) {
        console.log("field change");
        this.setState({
            [field]: e.target.value
        });
    }

    prefChangeHandler(field, e) {
        console.log("pref field change " + field);
        console.log(this.state.favoritecolor);
        const prefs1 = JSON.parse(JSON.stringify(this.state.favoritecolor));
        console.log(prefs1);
        prefs1.value = e.target.value;
        console.log(prefs1);

        this.setState({
            [field]: prefs1
        });
    }
    componentDidMount() {
        console.log("In profile");
        console.log(this.props);

        // first fetch the user data to allow update of username
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/"+"users/"+ sessionStorage.getItem("user"), {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result) {
                        console.log(result);

                        this.setState({
                            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                            // try and make the form component uncontrolled, which plays havoc with react
                            username: result.username || "",
                            firstname: result.firstName || "",
                            lastname: result.lastName || "",
                            status: result.status || ""

                        });
                    }
                },
                error => {
                    alert("error!");
                }
            );


    }

    submitHandler = event => {
        //keep the form from actually submitting
        // event.preventDefault();

        //make the api call to the user controller
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/"+"users/"+sessionStorage.getItem("user"), {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result) {
                        console.log(result);

                        this.setState({
                            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                            // try and make the form component uncontrolled, which plays havoc with react
                            username: result.username || "",
                            firstname: result.firstName || "",
                            lastname: result.lastName || "",
                            status: result.status || ""
                        });
                    }
                },
                error => {
                    alert("error!");
                }
            );

    };


    render() {
        return (
        <div className="App_Settings">

        <header className="Header_app">
            <img id="profile_picture" src = {profile_photo} alt="profile" width="200" height="200" />
            <h2 id="profile_info"> Hey {this.state.username}! Welcome!<br/> User Bio: {this.state.status}  <label>

            </label> </h2>

        </header>
        <header className="Content">
            <h1 className={"Followers"}>
                <text>
                    Followers <br/> 100
                </text>
            </h1>
            <h1 className={"Following"}>Following <br/> 100</h1>
            <h1 className={"Tracks"}>Tracks Posted <br/> 20</h1>
        </header>
        <header className="My-tracks">
            <img src={my_tracks} alt="profile" width="150" height="150" />
            <p>My Tracks</p>
        </header>
        <header className="playlist">
            <img src={playlist} alt="profile" width="150" height="150" />
            <p>My Playlist's</p>
        </header>
            <header className="button-css">
                <Link to = "/usersettings">
                    <input type="submit" value="Edit User Settings" />
                </Link>
            </header>

        </div>

        );
    }

}

export default userAccount;