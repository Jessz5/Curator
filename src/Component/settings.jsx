import React, {Component} from 'react';
import profile_photo from './profile_photo.jpg'
import './user_account_style.css'
import styled from "styled-components";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import {Redirect} from 'react-router';
import RedirectHandler from "./RedirectHandler";


class settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            favoritesong: "",
            status : "",
            responseMessage: "",
            spotify_email: "",
            spotify_username: "",
            spotToken: "",
            form_data : new FormData(),
            pictureAsFile:"",
            profile_picture:"https://webdev.cse.buffalo.edu",
            id:0,
            fetchOptions: {method: '', headers: ''},
            redirect:false,
            redirect_to :""
        };
        this.fieldChangeHandler.bind(this);
        this.getUserArtifact.bind(this);
        this.create_userArtifact.bind(this);
        this.uploadPicture.bind(this);
        this.deleteUserArtifact.bind(this);

        //If there's cookies to extract
        if(document.cookie != ''){
            //Try to find the cookie matching the current user
            try{
                this.state.spotToken = document.cookie.match('(^|)+' + sessionStorage.getItem("user") + '+=([^;]+)')?.pop() || ''
                this.state.fetchOptions = {method: "GET", headers: new Headers({'Authorization': `Bearer ${this.state.spotToken}`})};
            }
            catch{console.log("No matching cookie for current user")};
        }

    }

    getSpotifyInfo(){
        fetch('https://api.spotify.com/v1/me', this.state.fetchOptions)
            .then(function (response) {
                return response.json();})
            .then(json => {this.setState({spotify_email: json.email, spotify_username: json.display_name})})
            .then( function (json) {console.log(json);})
            .catch(function (error) {console.log(error);});
    };

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
        this.getUserArtifact();

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
                        console.log("it was here 95");
                       this.setState({
                           username: result.username || "",
                           firstname: result.firstName || "",
                           lastname: result.lastName|| "",
                           status: result.status|| ""

                       })
                    }
                },
                error => {
                    alert("error!");
                }
            );

        //Next Fetch the SpotifyInfo from the SpotifyAPI
        this.getSpotifyInfo();
    }
    submitHandler = event => {
        //keep the form from actually submitting
        event.preventDefault();

        //make the api call to the user controller
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/"+"users/"+sessionStorage.getItem("user"), {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            },
            body: JSON.stringify({

                username: this.state.username || "",
                firstName: this.state.firstname || "",
                lastName: this.state.lastname|| "",
                status: this.state.status|| ""
            })
        })
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        responseMessage: result.Status
                    });
                },
                error => {
                    alert("error!");
                }
            )
          .then(() => this.setState(
                    {redirect:true,
                        redirect_to:"/useraccount"

                    }))

    };
    deleteUserArtifact= event => {

        // event.preventDefault();
        //make the api call to the user controller

        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/user-artifacts/"+this.state.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
            .then(
                result => {
                    if(result['status']===204){
                        this.deleteHandler();
                    }


                },
                error => {
                    alert("error!"+error);
                }
            );
        


    };

    deleteHandler = event => {

        // event.preventDefault();
        //make the api call to the user controller
       

        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/users/"+sessionStorage.getItem("user"), {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
            .then(
                result => {
                    alert("User successfully deleted");
                    console.log("deleted");

                    if (result['status']===204){
                        sessionStorage.clear();

                    }

                },
                error => {
                    alert("error!"+error);
                }
            )
         .then(() => this.setState({redirect:true,
                redirect_to:"/"
            }))



    };


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

                    if (result[0].length > 0) {

                        this.setState({
                            // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                            // try and make the form component uncontrolled, which plays havoc with react
                            id:result[0][0].id || ""

                        });

                    }
                    else{
                        this.create_userArtifact();
                        this.getUserArtifact();

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

                    this.setState({
                        responseMessage: result.Status
                    });
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



        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/user-artifacts/"+ this.state.id +"/upload", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem("token"),

            },
            body:formData

        })
            .then(
                result => {
                    if (result['status'] === 400) {
                        alert("Wrong format of the file please upload one of these types png, jpg, jpeg, gif, webp, svg, wav, mp3, wma, mov, mp4, avi, wmv, webm.");
                    }else {

                        alert("Profile picture updated!");
                    }
                },
                error => {

                    alert("error!"+error);
                }
            )
        .then(() => this.setState({redirect:true,
                redirect_to:"/useraccount"
            }));



    };
    uploadPicture = (e) => {

        this.state.pictureAsFile = e.target.files[0];


    };


    render() {
        const {redirect,redirect_to} = this.state;
        if (redirect) {
            if (redirect_to === "/") {
                return (<Redirect to="/"/>)
            }
            if (redirect_to === "/useraccount") {
                return (<Redirect to="/useraccount"/>)
            }
        }
        return (
             <div>
            <header>
                <Navbar/>
            </header>
                <div  id="settings_list">
                    <p className="spotifyInfo1">Spotify Email: {this.state.spotify_email}</p>
                        <p className="spotifyInfo2">Spotify Username: {this.state.spotify_username}</p>
                        <form onSubmit={this.submitHandler} className="profile-form">
                            <label className="settingLable">
                                Username
                                <input
                                    type="text"
                                    onChange={e => this.fieldChangeHandler("username", e)}
                                    value={this.state.username}
                                />
                            </label>
                            <label className="settingLable">
                                First Name
                                <input
                                    type="text"
                                    onChange={e => this.fieldChangeHandler("firstname", e)}
                                    value={this.state.firstname}
                                />
                            </label>
                            <label className="settingLable">
                                Last Name
                                <input
                                    type="text"
                                    onChange={e => this.fieldChangeHandler("lastname", e)}
                                    value={this.state.lastname}
                                />
                            </label>
                            <label className="settingLable">
                                Edit User Bio
                                <input
                                    type="text"
                                    onChange={e => this.fieldChangeHandler("status", e)}
                                    value={this.state.status}
                                />
                            </label>
                            <input id="settingButton" className="MainButton" type="submit" value="Submit" />
                        </form>
                    <input id="deleteButtonSettings" className="secondaryButton" type="submit" value="Delete account" onClick={this.deleteUserArtifact}/>
                </div>  
                    <form id="image-form" onSubmit={this.changeProfilePicture}>
                        <input id="chooseImageButton" type="file" id="image_upload" name="image_uploads" onChange={this.uploadPicture}/>
                        <input id="uploadImageButton" type="submit" value="Upload Profile Picture" className="MainButton"/>
                    </form>
            </div>
        );
    }

}

export default settings;
