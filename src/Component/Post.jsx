import React from "react";
import "../App.css";
import CommentForm from "./CommentForm.jsx";
import helpIcon from "../assets/delete.png";
import commentIcon from "../assets/comment.svg";
import thumbsUp from "../assets/like.svg";
import thumbsDown from "../assets/dislike.svg";
import blueThumb from "../assets/liked.svg";
import redThumb from "../assets/disliked.svg";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comments: this.props.post.commentCount,
      reaction: 0,
    };
    this.post = React.createRef();
  }

  like(event) {
    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags?postID="+this.props.post.id +"&userID="+sessionStorage.getItem("user")+"&name=like&type=reaction", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        }
      }).then(res => res.json()
      ).then(
        result => {
          if(result[1] === 0){
            fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    postID: this.props.post.id,
                    userID: sessionStorage.getItem("user"),
                    name: "like",
                    type: "reaction"
                })
              }).then(
                  res => res.json()
              ).then(
                fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags?postID="+this.props.post.id +"&userID="+sessionStorage.getItem("user")+"&name=dislike&type=reaction", {
                  method: "GET",
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+sessionStorage.getItem("token")
                  }
                }).then(res => res.json()
                ).then(
                    result => {
                        if(result[1] === 1){
                          fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags/"+result[0][0].id, {
                              method: "DELETE",
                              headers: {
                                'Authorization': 'Bearer '+sessionStorage.getItem("token")
                              }
                            })
                        }
                    }
                )
              ).then(
                this.setState({
                  reaction: 1
                })
              )
          }else{
            fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags/"+result[0][0].id, {
              method: "DELETE",
              headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
              }
            }).then(
              this.setState({
                reaction: 0
              })
            )
          }
        }
      )
    }

  dislike(event){
      fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags?postID="+this.props.post.id +"&userID="+sessionStorage.getItem("user")+"&name=dislike&type=reaction", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
        }
      }).then(res => res.json()
      ).then(
        result => {
          if(result[1] === 0){
            fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    postID: this.props.post.id,
                    userID: sessionStorage.getItem("user"),
                    name: "dislike",
                    type: "reaction"
                })
            }).then(
                res => res.json()
            ).then(
              fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags?postID="+this.props.post.id +"&userID="+sessionStorage.getItem("user")+"&name=like&type=reaction", {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
              }).then(res => res.json()
              ).then(
                result => {
                  if(result[1] === 1){
                    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags/"+result[0][0].id, {
                        method: "DELETE",
                        headers: {
                          'Authorization': 'Bearer '+sessionStorage.getItem("token")
                        }
                      })
                  }
                }
              )
            ).then(
              this.setState({
                reaction: -1
              })
            )
          }else{
            fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/post-tags/"+result[0][0].id, {
              method: "DELETE",
              headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem("token")
              }
            }).then(
              this.setState({
                reaction: 0
              })
            )
          }
        }
      )
    }

    checkInput = () => {
        if (this.state.reaction === 1) {
            alert("You have liked this post");
            return;
        }
        else if (this.state.reaction === -1) {
            alert("You have disliked this post");
            return;
        }
    };

  showModal = e => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  setCommentCount = newcount => {
    this.setState({
      comments: newcount
    });
  };
  getCommentCount() {
    if (!this.state.comments || this.state.comments === "0") {
      return 0;
    }
    return parseInt(this.state.comments);
  }
  showHideComments() {
    if (this.state.showModal) {
      return "comments show";
    }
    return "comments hide";
  }
  deletePost(postID) {
    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH+"/posts/"+postID, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
      })
      .then(
        result => {
          this.props.loadPosts();
        },
        error => {
          alert("error!"+error);
        }
      );
  }

  displayFrame(){
    return <iframe id="test" src={this.props.post.content} width="300" height="300" frameBorder="0" allowTransparency="true" allow="encrypted-media" />
  }

  displayLikeButton(){
    if (this.state.reaction === 1) {
        return <img src={blueThumb} onClick={event => this.like(event)}/>
    }
    else {
        return <img src={thumbsUp} onClick={event => this.like(event)}/>
    }
  }

  displayDislikeButton(){
    if (this.state.reaction === -1) {
        return <img src={redThumb} onClick={event => this.dislike(event)}/>
    }
    return <img src={thumbsDown} onClick={event => this.dislike(event)}/>
  }

  // we only want to display comment information if this is a post that accepts comments
  conditionalDisplay() {
    console.log("Comment count is " + this.props.post.commentCount);

    if (this.props.post.commentCount < 0) {
      return "";
      }
    else {
      return (
        <div className="comment-block">
          <div className="comment-indicator">
            <div className="comment-indicator-text">
              {this.getCommentCount()} Comments
            </div>
          </div>
           {this.props.post.content}
           <br />
           {this.displayLikeButton()}
           {this.displayDislikeButton()}
           {this.checkInput()}
          <div className={this.showHideComments()}>
            <CommentForm
              onAddComment={this.setCommentCount}
              parent={this.props.post.id}
              commentCount={this.getCommentCount()}
            />
          </div>
        </div>
      );
    }

  }
  // we only want to expose the delete post functionality if the user is
  // author of the post
  showDelete(){
    if (this.props.post.author.id == sessionStorage.getItem("user")) {
      return(
      <img
        src={helpIcon}
        className="sidenav-icon deleteIcon"
        alt="Delete Post"
        title="Delete Post"
        onClick={e => this.deletePost(this.props.post.id)}
      />
    );
    }
    return "";
  }
  render() {
    return (
      <div>
        <div key={this.props.post.id}className={[this.props.type, "postbody"].join(" ")}>
          {this.displayFrame()}
          {this.conditionalDisplay()}
        </div>
      </div>
    );
  }
}