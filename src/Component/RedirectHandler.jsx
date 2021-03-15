import "../App.css";
import React from "react";
import {Redirect} from 'react-router';
var querystring = require('querystring');



class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken: querystring.parse(this.props.location.search.slice(1), { ignoreQueryPrefix: false }), //Get the auth code from the redirect uri query
        }

        let req = new XMLHttpRequest();
        req = this.assemblePath()
        req.send()
        
      }

    //This method parses the authentication token into a key-value pair for easy look-up
    parseAuth(){
        var str = " "
        return str
    }

    //This method uses the authtoken and secret client ID to generate a request to the token endpoint.
    assemblePath(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST",'https://accounts.spotify.com/api/token' +
    querystring.stringify({
        client_id: this.props.client_id,
        client_secret: this.props.client_secret,
        grant_type: 'authorization_code',
        code: this.state.authToken.code,
        redirect_uri: "http://localhost:3000/",
      }), true)
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.state.authToken)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Connection", "close");

    return xhr
    }

    render(){
        return <Redirect to="/"/>
    }

}

export default RedirectHandler;