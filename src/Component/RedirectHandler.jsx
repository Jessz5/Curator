import "../App.css";
import React, { Component } from "react";
import {Redirect} from 'react-router';
var querystring = require('querystring');



class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken: querystring.parse(props.location.hash.slice(1)), //Get the auth code from the redirect uri query
            jsonData: [{id: 1, name: "This is test1"},{id: 2, name: "This is test2"},{id: 3, name: "This is test3"}]
        };

        const fetchOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${this.state.authToken.access_token}`
            })
        };
        


        fetch('https://api.spotify.com/v1/me', fetchOptions)
        .then(function (response) {
        return response.json();})
        .then(json => {this.state.jsonData = json; this.onAuth();})
        .then( function (json) {console.log(json);})
        .catch(function (error) {console.log(error);});
      }

    onAuth() {
        this.props.onAuthentication(this.state.jsonData);
    }

    render(){
        return <Redirect to="/userPost"/>
    }

}

export default RedirectHandler;