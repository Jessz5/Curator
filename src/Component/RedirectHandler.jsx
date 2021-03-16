import "../App.css";
import React from "react";
import {Redirect} from 'react-router';
var querystring = require('querystring');



class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken: querystring.parse(this.props.location.search.slice(1)), //Get the auth code from the redirect uri query
        }

        const fetchOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer BQA9fGzf4lizUPyIAYeMF4-7lNLIM54fF3Es9HxJr2j1hSfbErOjj52A26dSB1ltciWg3cCB8mZZ_upWBakwLLX_1uZI-rQ0oPrvCuJjTpFeNKTSP9GLRhDv1yjb_wrTtfE79o5x_sddbPr3nYLJSmoemXIKtC6X1U6qzd841KIiY--Jekbn6EAT`
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
        return <Redirect to="/"/>
    }

}

export default RedirectHandler;