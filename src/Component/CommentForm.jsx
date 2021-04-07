import React from "react";
import "../App.css";
import PostingList from "./PostingList.jsx";

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_text: "",
      postmessage: ""
    };
    this.postListing = React.createRef();
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page

    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/posts", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        authorID: sessionStorage.getItem("user"),
        content: this.state.post_text,
        parentID: this.props.parent,
        thumbnailURL: "",
        type: "comment"
      })
    })
      .then(res => res.json())
      .then(
        result => {
          // update the count in the UI manually, to avoid a database hit
          this.props.onAddComment(this.props.commentCount + 1);
          //Figure out how to refresh the page to show the new comment on creation
        },
        error => {
          alert("error!");
        }
      );
  };

  myChangeHandler = event => {
    this.setState({
      post_text: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form className = "comment-form" onSubmit={this.submitHandler}>
          <label>
            Add A Comment to Post {"#" + this.props.parent}
            <br />
            <textarea rows="4" cols="50" onChange={this.myChangeHandler} />
          </label>
          <br />

          <input className="commentButton" type="submit" value="submit" style={{position: "relative",top: "20px"}}/>
          <br />
          {this.state.postmessage}
        </form>
      </div>
    );
  }
}
