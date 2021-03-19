import "../App.css";
import React from "react";
import {Redirect} from 'react-router';
var querystring = require('querystring');



class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken: querystring.parse(props.location.hash.slice(1)), //Get the auth code from the redirect uri query
        }

        const fetchOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${this.state.authToken.access_token}`
            })
        };
        
        fetch('https://api.spotify.com/v1/me', fetchOptions).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
        }).catch(function (error) {
            console.log(error);
        });
        
      }

    render(){
        return <Redirect to="/userPost"/>
    }

}

export default RedirectHandler;