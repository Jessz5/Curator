import React, {Component} from 'react';
import profile_photo from './profile_photo.jpg'
import './user_account_style.css'
import EditUserBio from './editUserBio'
import emailNotifications from './emailNotifications.jsx'
import styled from "styled-components";


const StyledButton = styled.button`
  background-color: #1DB954;
  font-size: 25px;
  color: white;
  cursor: pointer;
   font-weight: bold;
`;
class settings extends Component {
    render() {
        return (
            <div className="App">
                <header className="Header_app">
                    <h1 className={"Logo"}><center>Curator-Logo</center></h1>
                    <img src={profile_photo} alt="profile" width="200" height="200" />
                    <h2> Hey Rory!</h2>
                    <h3>User Settings </h3>

                </header>
                <header className="SettingsList">
                    <StyledButton onClick={emailNotifications}>Privacy</StyledButton><br />
                    <br />
                    <StyledButton onClick={EditUserBio}>Edit User Bio</StyledButton><br />
                    <br />
                    <StyledButton onClick={emailNotifications}>Login Activity</StyledButton><br />
                    <br />
                    <StyledButton onClick={emailNotifications}>Account Status</StyledButton><br />
                    <br />
                    <StyledButton onClick={emailNotifications}>Manage Songs</StyledButton><br />
                    <br />
                    <StyledButton onClick={emailNotifications}>Email Notifications</StyledButton><br />


                </header>



            </div>
        );
    }

}

export default settings;