import React, {Component} from 'react';
import profile_photo from './profile_photo.jpg'
import my_tracks from './my_tracks.jpg'
import playlist from './playlist.png'
import './user_account_style.css'
import settings from "./settings";
import {Link} from "react-router-dom";


class userAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            favoritesong: "",
            status : "",
            responseMessage: "",
            friendsCount: 0,
            followersCount: 0
        };
        this.fieldChangeHandler.bind(this);
        this.loadFollowers.bind(this);
        this.loadFriends.bind(this);
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
    loadFollowers(){
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/connections?connectedUserID="+sessionStorage.getItem("user"), {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          }
         })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
              console.log(result);
                this.setState({
                    followersCount: result[1]
                });
              }
            },
            error => {
              alert("error!");
            }
          );
    }
    loadFriends() {
        //gets all the connections(friends) related to the user
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api"+"/connections?userID="+sessionStorage.getItem("user"), {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          }
         })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
              //console.log(result[1])
                this.setState({
                    friendsCount: result[1]
                });
              }
            },
            error => {
              alert("error!");
            }
          );
      }

    componentDidMount() {
        this.loadFollowers();
        this.loadFriends();
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
            <header className="Followers">
                <Link className="secondaryButton" id = "allFollowers" to = "/allFollowers">
                    Followers
                </Link>
               <br/>
               {this.state.followersCount}
            </header>
            <header className="Following">
                <Link  className ="secondaryButton" to = "/allFriends">
                    Following
                </Link>
                <br/>
                {this.state.friendsCount}
            </header>
            <h1 className={"Tracks"}>Tracks Posted <br/> 20</h1>
        </header>
        <header className="My-tracks">
            <img src={my_tracks} alt="profile" width="150" height="150" />
            <p>My Tracks</p>
        </header>
        <header className="playlist">
            <img src={playlist} alt="profile" width="150" height="150" />
                <span id="playlistTitle">My Playlist's</span>
        </header>
                <Link className="secondaryButton" id="editSettings" to = "/usersettings">
                Edit User Settings
                </Link>

        </div>

        );
    }

}

export default userAccount;