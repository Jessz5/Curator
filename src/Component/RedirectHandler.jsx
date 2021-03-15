import React from "react";
import { Redirect } from 'react-router';
var querystring = require('querystring');


class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken: querystring.parse(this.props.location.search, { ignoreQueryPrefix: true }), //Get the auth code from the redirect uri query
        }

        let req = new XMLHttpRequest();
        req = this.assemblePath()
        req.send()
        
      }

    //This method uses the authtoken and secret client ID to generate a request to the token endpoint.
    assemblePath(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",'https://accounts.spotify.com/api/token/' +
    querystring.stringify({
        code: this.state.authToken,
        client_secret: this.state.client_secret,
        redirect_uri: "http://localhost:3000/",
        grant_type: 'authorization_code'
      }))
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.state.authToken)

    return xhr
    }

    render(){
        return <Redirect to="/"/>
    }

}

export default RedirectHandler;