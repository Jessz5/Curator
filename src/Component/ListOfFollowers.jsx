import React from "react";
import "../App.css";
import blockIcon from "../assets/block_white_216x216.png";
import unblockIcon from "../assets/thumbsup.jpg";

export default class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      followers: []
    };
  }

  componentDidMount() {
    this.loadFollowers();
  }

  loadFollowers(){
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/connections?connectedUserID="+sessionStorage.getItem("user"), {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem("token")
          }
         })
          .then(res => res.json())
          .then(
            result => {
              if (result) {
              console.log(result);
                this.setState({
                    isLoaded: true,
                    followers: result[0]
                });
              }
            },
            error => {
              this.setState({
                  isLoaded: true,
                  error
              });
            }
          );
    }

  render() {
    const {error, isLoaded, followers} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="post">
          <ul>
            {followers.map(connection => (
              <div key={connection.id} className="userlist">
                {connection.user.username} - {connection.user.status}
                <br />
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}
