import React from "react";
import "../App.css";
import blockIcon from "../assets/block_white_216x216.png";
import unblockIcon from "../assets/thumbsup.jpg";
import {Link} from "react-router-dom";

export default class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      connections: []
    };
  }

  componentDidMount() {
    this.loadFriends();
  }

  loadFriends() {
    //gets all the connections(friends) related to the user
    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api"+"/connections?userID="+sessionStorage.getItem("user"), {
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
            this.setState({
              isLoaded: true,
              connections: result[0]
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

  updateConnection(id, status){
    //patch updates/modify an existing connection
    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api"+"/connections/"+id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        status: status
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
          this.loadFriends();
        },
        error => {
          alert("error!");
        }
      );
  }

  conditionalAction(status, id){
    if (status == "active"){
      return(

      <img
        src={blockIcon}
        className="sidenav-icon deleteIcon"
        alt="Block User"
        title="Block User"
        onClick={e => this.updateConnection(id, "blocked")}
      />
    )
    }else{
      return(
      <img
        src={unblockIcon}
        className="sidenav-icon deleteIcon"
        alt="Unblock User"
        title="Unblock User"
        onClick={e => this.updateConnection(id, "active")}
      />
    )
    }
  }

  render() {
    //this.loadPosts();
    const {error, isLoaded, connections} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="post">
          <ul>
            {connections.map(connection => (
              <div key={connection.id} className="userlist">
                {connection.connectedUser.username} - {connection.status}
                <div className="deletePost">
                {this.conditionalAction(connection.status, connection.id)}
                </div>
              </div>
            ))}
          </ul>
          <Link className="secondaryButton" to = "/findFriends">
                              Find Friends
          </Link>
        </div>
      );
    }
  }
}
