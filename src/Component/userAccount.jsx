import React, {Component} from 'react';
// import './App.css';
import profile_photo from './profile_photo.jpg'
import my_tracks from './my_tracks.jpg'
import playlist from './playlist.png'
import './user_account_style.css'

class userAccount extends Component {
    render() {
        return (
            <div className="App_Settings">
                <header className="Header_app">
                    <img id="profile_picture"src={profile_photo} alt="profile" width="200" height="200" />
                    <h2 id="profile_info"> Hey Rory! Welcome! <br/> User Bio </h2>

                </header>
                <header className="Content">
                    <h1 className={"Followers"}>
                        <text>
                            Followers <br/> 100
                        </text>
                    </h1>
                    <h1 className={"Following"}>Following <br/> 100</h1>
                    <h1 className={"Tracks"}>Tracks Posted <br/> 20</h1>
                </header>
                <header className="My-tracks">
                    <img src={my_tracks} alt="profile" width="150" height="150" />
                    <p>My Tracks</p>
                </header>
                <header className="playlist">
                    <img src={playlist} alt="profile" width="150" height="150" />
                    <p>My Playlist's</p>
                </header>

            </div>
        );
    }

}

export default userAccount;