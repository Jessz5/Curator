import React, {Component} from 'react';
import profile_photo from './profile_photo.jpg'
import './user_account_style.css'
import styled from "styled-components";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import { ThreeSixtyRounded } from '@material-ui/icons';


const StyledButton = styled.button`
  background-color: #1DB954;
  font-size: 25px;
  color: white;
  cursor: pointer;
   font-weight: bold;
`;
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
            fetchOptions: {method: '', headers: ''}
        };
        this.fieldChangeHandler.bind(this);
        if(this,props.location && this.props.location.state && this.props.location.state.authToken){
            this.state.fetchOptions = {method: "GET", headers: new Headers({'Authorization': `Bearer ${this.props.location.state.authToken.access_token}`})};
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

                username: this.state.username,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                status: this.state.status,
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

    };

    render() {
        return (
            <header className="settings_list">
                <Navbar/>
                <p className="spotifyInfo">{this.state.spotify_email}</p>
                <p className="spotifyInfo">{this.state.spotify_username}</p>
                <form onSubmit={this.submitHandler} className="profileform">
                    <label>
                        Username
                        <input
                            type="text"
                            onChange={e => this.fieldChangeHandler("username", e)}
                            value={this.state.username}
                        />
                    </label>
                    <label>
                        First Name
                        <input
                            type="text"
                            onChange={e => this.fieldChangeHandler("firstname", e)}
                            value={this.state.firstname}
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            type="text"
                            onChange={e => this.fieldChangeHandler("lastname", e)}
                            value={this.state.lastname}
                        />
                    </label>
                    <label>
                        Edit User Bio
                        <input
                            type="text"
                            onChange={e => this.fieldChangeHandler("status", e)}
                            value={this.state.status}
                        />
                    </label>
                    <input type="submit" value="submit" />
                </form>
            </header>
    );
    }

}

export default settings;

