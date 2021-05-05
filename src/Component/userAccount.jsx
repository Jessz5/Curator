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
            followersCount: 0,
            form_data : new FormData(),
            pictureAsFile:"",
            profile_picture:profile_photo,
            id:0
        };
        this.fieldChangeHandler.bind(this);
        this.loadFollowers.bind(this);
        this.loadFriends.bind(this);
        this.loadProfilePicture.bind(this);
        this.getUserArtifact.bind(this);
        this.create_userArtifact.bind(this);
        this.uploadPicture.bind(this);
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

    loadProfilePicture(){
        console.log("it was here 104");
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/user-artifacts?ownerID="+sessionStorage.getItem("user"), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    console.log(this.state.profile_picture);
                    console.log("line121");
                    if (result[0].length !== 0) {
                        console.log("it was here 154");
                        this.getUserArtifact();
                      if(result[0][0].url!=="") {
                            this.setState({
                                profile_picture: "https://webdev.cse.buffalo.edu" + result[0][0].url || ""
                            });
                        }
                        console.log(this.state.profile_picture);

                        console.log(this.state.id);



                    }
                    else {
                        console.log("it was here else statement");
                        this.create_userArtifact();
                    }
                },

                error => {
                    alert("error!");
                }

            );

    }
    create_userArtifact(){

        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/user-artifacts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                "ownerID":sessionStorage.getItem("user") ,
                "type": "ProfilePicture",
                "url": "",
                "category": "string"

            })
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log("it was here4");
                    this.getUserArtifact();

                    this.setState({
                        responseMessage: result.Status
                    });
                },
                error => {
                    alert("error!");
                }
            );


    }


    getUserArtifact(){
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/user-artifacts?ownerID="+ sessionStorage.getItem("user"), {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log("it was here192");
                    console.log(result);
                    if (result[0].length > 0) {

                        this.setState({
                            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                            // try and make the form component uncontrolled, which plays havoc with react
                            id:result[0][0].id || ""

                        });
                        console.log("it was here189");
                        console.log(this.state.id);

                    }
                },
                error => {
                    alert("error!");
                }
            );
    }

    changeProfilePicture = event => {
        event.preventDefault();
        // this.getUserArtifact();

        var formData = new FormData();

        formData.append("file",(this.state.pictureAsFile));

        if (this.state.pictureAsFile.endsWith('.jpg')){
            console.log("it was here223, jpg file.!")
        }


        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/user-artifacts/"+ this.state.id +"/upload", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem("token"),

            },
            body:formData



        })
            .then(
                result => {

                    alert("Profile picture updated!");
                },
                error => {
                    alert("error!"+error);
                }
            );



    };
    uploadPicture = (e) => {

        this.state.pictureAsFile = e.target.files[0];


    };






    componentDidMount() {
        this.loadFollowers();
        this.loadFriends();
        this.loadProfilePicture();
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
                <div className="Header_app">
                    <img id="profile_picture" src = {this.state.profile_picture} alt="profile" width="200" height="200" />
                    <h2 id="profile_info"> Hey {this.state.username}! Welcome!<br/> User Bio: {this.state.status}  <label>
                    </label> 
                    </h2>
                    <div className="connections">
                        <div className="followers">
                            <Link className="secondaryButton" id = "allFollowers" to = "/allFollowers">
                                Followers
                            </Link>
                            {this.state.followersCount}
                        </div>
                        
                        <div className="following">
                            <Link  className ="secondaryButton" to = "/allFriends">
                                Following
                            </Link>
                            {this.state.friendsCount}
                        </div>
                    </div>
                </div>
                <Link className="secondaryButton" id="editSettings" to = "/usersettings">
                    Edit User Settings
                </Link>
            </div>

        );
    }

}

export default userAccount;
