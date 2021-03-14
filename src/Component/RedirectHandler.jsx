import React from "react";
import { Redirect } from 'react-router';

class RedirectHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authToken: this.getTokens()
        }
      }

    //Creates a link to the spotify website to store in authLink
    getTokens() {
        console.log("Entered getTokens");
        return this.props.location.search
    }

    render(){
        return <Redirect to="/"/>
    }

}

export default RedirectHandler;