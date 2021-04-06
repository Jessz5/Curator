import "../App.css";
import React, { Component } from "react";
import {Redirect} from 'react-router';
var querystring = require('querystring');



class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken: querystring.parse(props.location.hash.slice(1)), //Get the auth code from the redirect uri query
            jsonData: [{id: 1, name: "This is test1", aToken: ""}]
        };

        document.cookie = "spotToken" + sessionStorage.getItem("user") + "=" + this.state.authToken.access_token;
    }
    render(){
        return <Redirect
        to={{
        pathname: "/UserPost"
      }}
    />
    }

}

export default RedirectHandler;