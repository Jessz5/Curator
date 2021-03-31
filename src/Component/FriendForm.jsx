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
      users: [],
      //friends: []
      isFriend: false
    }
    //this.getCurrentConnections.bind(this);
    //this.componentDidMount.bind(this);
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

//   getCurrentConnections() {
//     fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/connections/", {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer '+sessionStorage.getItem("token")
//       }
//       })
//       .then(res => res.json())
//       .then(
//         result => {
//           if (result) {
//             let friendNames = [];
//             console.log(result[0]);
//             result[0].forEach(element => {{friendNames.push(element)}});
//             //console.log(names)
//             this.setState({
//               friends: friendNames,
//               responseMessage: result.Status
//             });
//             console.log(friendNames);
//             console.log(this.state.friends)
//          }
//        },
//        error => {
//          alert("error!");
//        }
//      );
//   }
    checkInput = () => {
        if (this.state.friendid === "") {
            alert("You did not make a selection");
            return;
        }
        else if (this.state.friendid === sessionStorage.getItem("user")) {
            alert("You cannot friend yourself");
            return;
        }
        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api"+"/connections?userID=" + sessionStorage.getItem("user") + "&connectedUserID=" + this.state.friendid, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(
            result => {
                if (result[1] > 0) {
                    alert("You are already friends with this user");
                    return;
                } else{
                    this.setState({
                        isFriend: true,
                    });
                }
            },
        );
    };


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


           //calls getCurrentConnections
//            this.getCurrentConnections();
//            console.log(this.state.friends)
//            for (var i=0; i < names.size; i++){
//                if (this.state.friends.includes(names[i])) {
//                  names.splice(i, 1);
//                 }
//             }

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
    this.checkInput();

    console.log("friend is ");
    console.log(this.state.friendid);

    if(this.state.isFriend){
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
      )
      .then(this.props.history.push("/allFriends"));
    }
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
