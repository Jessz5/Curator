/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/
import React from "react";
import "./App.css";
import userAccount from "./Component/userAccount.jsx";
import settings from "./Component/settings.jsx";
import "./darkpages.css";
import PostForm from "./Component/PostForm.jsx";
import FriendList from "./Component/FriendList.jsx";
import Profile from "./Component/Profile.jsx";
import FriendForm from "./Component/FriendForm.jsx";
import Modal from "./Component/Modal.jsx";
import Navbar from "./Component/Navbar.jsx";
import SpotifyLink from "./Component/SpotifyLink.jsx";
import ForgotPasswordForm from "./Component/ForgotPasswordForm.jsx";
import ForgotPasswordButton from "./Component/ForgotPasswordButton.jsx";
import LogInBanner from "./Component/LogInBanner";
import SignUpForm from "./Component/SignUpForm";
import Logo from "./Component/Logo";
import Feed from "./Component/Feed";
import GridLayout from './Component/GridLayout';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import "./searchpage.css";

import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import UserPost from "./Component/UserPost";


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
      refreshPosts: false
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
  }

  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts() {
    this.setState({
      refreshPosts:true
    });
  }

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

          <Navbar toggleModal={e => toggleModal(this, e)} />

          <div className="maincontent" id="mainContent">
            <Switch>
            <Route path="/settings">
              <div className="settings">
                <p>Settings</p>
                <Profile userid={sessionStorage.getItem("user")} />
              </div>
            </Route>


            <Route path="/friends">
              <div>
                <p>Friends</p>
                <FriendForm userid={sessionStorage.getItem("user")} />
                <FriendList userid={sessionStorage.getItem("user")} />
              </div>
            </Route>

            <Route path="/linkSpotify">

            <Route path="/search">
                <div className="search-page">
                    <header className= "curator-logo">
                        <h1>Curator</h1>
                    </header>
                    <div className="home-button">
                        <IconButton>
                            <HomeIcon/>
                        </IconButton>
                    </div>
                    <div className="search-button">
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                    </div>
                    <div className="bookmark-button">
                        <IconButton>
                            <BookmarkIcon/>
                        </IconButton>
                    </div>
                    <div className="account-button">
                        <IconButton>
                            <AccountIcon/>
                        </IconButton>
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
                    {/*"document.getElementById('myInput').value = ' '"*/}
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

            <Route path={["/posts","/"]}>
              <div>
                <header className="Dark-Header">
                  <p>Curator Logo Placeholder</p>
                </header>
                <body className="Dark-Body">
                  <p className="SpotifyText">Connect your account to Spotify in order to access full account features:</p>
                  <SpotifyLink/>
                </body>
              </div>
            </Route>

            <Route path="/forgotPassword">
              <div>
                <header className="Dark-Header">
                  <p>Curator Logo Placeholder</p>
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
            <Route exact path="/" component={LogInBanner}/>
            <Route path = "/UserPost">
              <Navbar/>
              <GridLayout/>
            </Route>
            <Route path = "/LogInBanner" component={LogInBanner}/>
            <Route path = "/SignUpForm" component={SignUpForm}/>
               <Route path="/userAccount" component = {userAccount} />
              <Route path="/userSettings" component = {settings} />
            </Route>
           </Switch>
            </div>
        </header>
      </div>
      <div>
        <Modal show={this.state.openModal} onClose={e => toggleModal(this, e)}>
          This is a modal dialog!
        </Modal>
        </div>
      </Router>
    );
  }
}

// export the app for use in index.js
export default App;
