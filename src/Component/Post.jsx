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
      error: null,
      isLoaded: false,
      comments: this.props.post.commentCount,
      posts: [],
      reaction: 0,
      showComments: false,
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

  deletePost(postID) {
    //make the api call to post, deleting only the post itself
    fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/posts/"+postID, {
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

  displayContent(){
    if(this.props.post.type == "Post"){
          return (
          <div className="postChild">
          <p className="authorName"> Author: {this.props.post.author.username}</p>
          <iframe id="embedFrame" src={this.props.post.content} width="300" height="300" frameBorder="0" allowTransparency="true" allow="encrypted-media" />
          </div>
          )
    }
    else{
          return (<div>{this.props.post.content} - Author: {this.props.post.author.username}</div>)
    }

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

  showCommentBlock = () => {
    
    if(this.state.showComments == false){
          this.setState({
        showComments: true
      });
      this.loadCommentPosts();
    }
    else{
      this.setState({
        showComments: false
      });
    }

}

  maybeDisplayComments(){
    const {error, isLoaded, posts} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else if (posts) {

      if (posts.length > 0){
      return (

        <div className="comments">

          {posts.map(post => (
            <Post key={post.id} post={post} type={this.props.type} loadPosts={this.props.loadPosts}/>
          ))}

        </div>

      );
    }else{
      return (<div> No Posts Found </div>);
    }
    } else {
      return <div> Please Log In... </div>;
    }
  }

  flipComments = () => {
    this.loadCommentPosts();
  }

  // we only want to display comment information if this is a post that accepts comments
  conditionalDisplay() {
    console.log("Comment count is " + this.props.post.commentCount);

    if (!this.state.showComments) {
      return "";
      }
    else {
        return(
          <div className="comment-block">
          <div className="comment-indicator">
            <div className="comment-indicator-text">
              {this.getCommentCount()} Comments
            </div>
          </div>
          <br />
          {this.displayLikeButton()}
          {this.displayDislikeButton()}
          {this.checkInput()}
          <CommentForm
                onAddComment={this.setCommentCount}
                parent={this.props.post.id}
                commentCount={this.getCommentCount()}
                flipComments={this.flipComments}
          />
          {this.maybeDisplayComments()}
          </div>
        );


    }

  }

  onDelete(event){
    console.log("Deleting Comment");
    this.deletePost(this.props.post.id); 
  }

  // we only want to expose the delete post functionality if the user is
  // author of the post
  showDelete(){
    if (this.props.post.author.id == sessionStorage.getItem("user")) {
      if(this.props.post.type == "Post"){
            return(
      <button
        className="sidenav-icon deleteIcon secondaryButton"
        onClick={e => this.deletePost(this.props.post.id)}
      >Delete Post</button>
      );
      }
      else{
        return(
          <button
            className="deleteComment"
            onClick={e => this.onDelete(e)}
          >Delete Post</button>
          );
      }

    }
    return "";
  }

  loadCommentPosts(){
    let url = "https://webdev.cse.buffalo.edu/hci/gme/api/api/posts?sort=newest&type=comment&parentID=" + this.props.post.id;

    fetch(url, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },

    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            this.setState({
              isLoaded: true,
              posts: result[0]
            });
            console.log("Got Comments");
            console.log(this.state.posts);
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log("ERROR loading Posts")
        }
      );
  }

  displayPostOrComment(){
    if(this.props.post.type == "Post"){
      return (
        <div>
          <div key={this.props.post.id} className={[this.props.type, "postbody"].join(" ")}>
            {this.displayContent()}
            <div className="postChild">
            <button className="show-comment MainButton" onClick={this.showCommentBlock}>Show/Hide Comments</button>
            {this.conditionalDisplay()}
            {this.showDelete()}
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div>
          <div key={this.props.post.id} className="CommentBody">
            {this.displayContent()}
            {this.showDelete()}
            {this.conditionalDisplay()}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.displayPostOrComment()}
      </div>
    );
  }
}