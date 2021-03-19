import React from "react";
import "../App.css";
import Autocomplete from "./Autocomplete.jsx";

export default class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendname: "",
      friendid: "",
      responseMessage: "",
      users: []
    };
    this.fieldChangeHandler.bind(this);
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  selectAutocomplete(friendID) {
      this.setState({
        friendid:friendID
      })
      console.log("Set Friend ID to "+friendID)
  }

  componentDidMount() {
    //gets all users information that's in the system
    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/users/", {
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
            let names = [];
            console.log(result[0]);
            result[0].forEach(element => {if (element.username){names.push(element)}});

            this.setState({
              users: names,
              responseMessage: result.Status
            });
            console.log(names);
          }
        },
        error => {
          alert("error!");
        }
      );
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    console.log("friend is ");
    console.log(this.state.friendid);


    //this creates the user connection
    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/connections/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        connectedUserID: this.state.friendid,
        userID: sessionStorage.getItem("user"),
        type:"friend",
        status:"active"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
        },
        error => {
          alert("error!");
        }
      );
  };

  render() {
    return (
      <form onSubmit={this.submitHandler} className="profileform">
        <label>
          Find a Friend!
          <br />
          <div className="autocomplete">
            <Autocomplete suggestions={this.state.users} selectAutocomplete={e => this.selectAutocomplete(e)} />
          </div>
        </label>
        <input type="submit" value="submit" />
        {this.state.responseMessage}
      </form>
    );
  }
}
