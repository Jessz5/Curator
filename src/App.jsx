/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/
import React from "react";

import {
  BrowserRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';

import "./App.css";
import UserAccount from "./Component/userAccount.jsx";
import Settings from "./Component/settings.jsx";
import "./darkpages.css";
import Navbar from "./Component/Navbar.jsx";
import ForgotPasswordForm from "./Component/ForgotPasswordForm.jsx";
import ForgotPasswordButton from "./Component/ForgotPasswordButton.jsx";
import LogInBanner from "./Component/LogInBanner";
import SignUpForm from "./Component/SignUpForm";
import GridLayout from './Component/GridLayout';
import RedirectHandler from './Component/RedirectHandler';
import Logo from './Component/Logo';

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import "./searchpage.css";
import UserPost from "./Component/UserPost";
import StyleGuide from "./Component/StyleGuide.jsx";


var querystring = require('querystring');

var client_id = '1b71fce4cd2040b6bc601f0901189e58'; //Spotify App Client ID
var client_secret = 'ebc54bd1ef494fecace8bdefcb834d88'; // Spotify App Secret ID
var redirect_uri = 'http://localhost:3000/spotifyAuth'; // Or Your redirect uri
var scope = 'user-read-private user-read-email'; //The scope defining the client information we want from Spotify


// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal
  });
}


// the App class defines the main rendering method and state information for the app
class App extends React.Component {

  // the only state held at the app level is whether or not the modal dialog
  // is currently displayed - it is hidden by default when the app is started.
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      refreshPosts: false,
      authLink: this.authorizeSpotify(),
      client_secret: client_secret,
      spotify_username: "",
      spotify_email: "",
      spotobj: []
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
    this.authorizeSpotify = this.authorizeSpotify.bind(this);
    this.onAuthentication = this.onAuthentication.bind(this);
  }

  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts() {
    this.setState({
      refreshPosts:true
    });
  }

  //This will generate a URL to send to Spotify, asking for authorization
  getLoginURL() {
    return 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'token',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        spotobj: [{id: 1, name: ""}]
        } 
      )
  }

  //Creates a link to the spotify website to store in authLink
  authorizeSpotify() {
    console.log('Entering Authorize Spotify')
    return this.getLoginURL()
  }

  //Callback function for json returned from Spotify Authentication
  onAuthentication(object) {this.state.spotobj = object;
   this.state.spotify_email = this.state.spotobj[0][0];
   console.log("Ran onAuthentication")};

  render() {

    return (

      // the app is wrapped in a router component, that will render the
      // appropriate content based on the URL path.  Since this is a
      // single page app, it allows some degree of direct linking via the URL
      // rather than by parameters.  Note that the "empty" route "/", which has
      // the same effect as /posts, needs to go last, because it uses regular
      // expressions, and would otherwise capture all the routes.  Ask me how I
      // know this.
      <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          <div className="maincontent" id="mainContent">
            <Switch>
            <Route path="/linkSpotify">
              <div>
                <header className="Dark-Header">
                <Logo/>
                </header>
                <body className="Dark-Body">
                  <p className="SpotifyText">Connect your account to Spotify in order to access full account features:</p>
                  <a className = "spotLinkText" href = {this.state.authLink}>
                    Link to Spotify
                  </a>
                </body>
              </div>
            </Route>

            <Route path="/spotifyAuth" 
                   render={(props) => ( <RedirectHandler {...props} client_id={client_id} client_secret={client_secret} onAuthentication={this.onAuthentication}/> ) } />

            <Route path="/forgotPassword">
              <div>
              <header className="Dark-Header">
                <Logo/>
              </header>
                <body className="Dark-Body">
                  <div className="fPasswordDiv">
                    <p className="fPasswordLabel">Enter your email address and we'll send you a recovery link:</p>
                    <ForgotPasswordForm/>
                  </div>
                  <div className="fPasswordButtonDiv">
                    <ForgotPasswordButton/>
                  </div>
                </body>
              </div>
            </Route>

            <Route path="/search">
                <div className="search-page">
                <div className="Nav_Wrapper">
                <Navbar/>
              </div>
                    <div className="search-container">
                        <div className="search-text">
                            <InputBase
                                type="text"
                                id="myInput"
                                inputRef={el => this.myInput = el}
                                placeholder="Search..."
                                startAdornment={<SearchIcon/>}
                            />
                        </div>
                    </div>
                    <button class="btn cancel" type="reset" onclick="this.myInput.value = ''">Cancel</button>
                    <ToggleButtonGroup>
                        <ToggleButton>
                            <p>Top</p>
                        </ToggleButton>
                        <ToggleButton>
                            <p>Songs</p>
                        </ToggleButton>
                        <ToggleButton>
                            <p>Accounts</p>
                        </ToggleButton>
                        <ToggleButton>
                            <p>Tags</p>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <div className="search-description">
                      <h2>Search Curator</h2>
                      <p>Find your favorite song clips, accounts, friends, and interesting posts</p>
                    </div>
                </div>
            </Route>



            <Route exact path="/" component={LogInBanner}/> 

            <Route path = "/UserPost">
              <div className="Nav_Wrapper">
              <Navbar/>
              </div>
              <GridLayout/>
            </Route>

            <Route path = "/LogInBanner" component={LogInBanner}/>
            <Route path = "/SignUpForm" component={SignUpForm}/>
            <Route path = "/StyleGuide" component={StyleGuide}/>
            <Route path="/userAccount">
            <div className="Nav_Wrapper_Account">
              <Navbar/>
              </div>
            <UserAccount/>
            </Route>  
            <Route path="/userSettings">
              <Settings/>
               </Route>
             
           </Switch>
          </div>
        </header>
      </div>
      </Router>
    );
  }
}

// export the app for use in index.js
export default App;
