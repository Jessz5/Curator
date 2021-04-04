import React from "react";
import "../App.css";
import CommentForm from "./CommentForm.jsx";
import helpIcon from "../assets/delete.png";
import commentIcon from "../assets/comment.svg";
export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comments: this.props.post.commentCount
    };
    this.post = React.createRef();
  }
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
  // we only want to display comment information if this is a post that accepts comments
  conditionalDisplay() {
    console.log("Comment count is " + this.props.post.commentCount);
    //if (this.props.post.commentCount <= 0) {
    //  return "";
    //  }

    //else {
      return (
        <div className="Post">
         <svg id="dots"xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
</svg>
            <div className="album"> 
                <div id="album_circle">
                <span class="A-dot"></span>
                    <div id="playbutton">
                    <span class="B-dot"></span>
                    </div>
                </div>
            </div>
            <svg id="heart"width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.543 4.98071L16.9178 5.40515L17.2926 4.98071L18.267 3.87729C21.2027 0.55268 26.5883 0.00147379 30.277 2.67495C32.0634 3.96968 32.8079 5.95094 32.8877 8.00243C32.9678 10.0625 32.3718 12.1328 31.5506 13.4987C27.0739 20.9449 23.6249 24.6555 16.9055 30.1763C13.3229 27.4641 10.725 25.4939 8.50453 23.2781C6.2305 21.0088 4.34471 18.4729 2.23104 14.6078C-0.169802 10.2175 -0.0370576 5.28102 3.55862 2.67494C7.24729 0.00147209 12.633 0.552681 15.5687 3.87729L16.543 4.98071Z" stroke="black" stroke-linecap="round"/>
</svg>
            <div className="SongInfo">
                <h6 id="SongName">All Me</h6>
                <h6 id="ArtistName">Drake</h6>
            </div>
            <svg id ="comment" width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1" fill="white">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.8192 29.0393C29.8046 26.1811 32.4011 21.509 32.4011 16.2305C32.4011 7.53117 25.3489 0.479004 16.6496 0.479004C7.95036 0.479004 0.898193 7.53117 0.898193 16.2305C0.898193 24.9297 7.95036 31.9819 16.6496 31.9819C16.8209 31.9819 16.9915 31.9792 17.1614 31.9737L26.8451 34.0615L25.8192 29.0393Z"/>
</mask>
<path d="M25.8192 29.0393L25.2364 28.2266L24.7097 28.6044L24.8394 29.2394L25.8192 29.0393ZM17.1614 31.9737L17.3721 30.9962L17.2521 30.9703L17.1295 30.9743L17.1614 31.9737ZM26.8451 34.0615L26.6344 35.039L28.1314 35.3618L27.8249 33.8614L26.8451 34.0615ZM31.4011 16.2305C31.4011 21.1731 28.9712 25.5482 25.2364 28.2266L26.4019 29.8519C30.638 26.814 33.4011 21.8449 33.4011 16.2305H31.4011ZM16.6496 1.479C24.7966 1.479 31.4011 8.08345 31.4011 16.2305H33.4011C33.4011 6.97888 25.9012 -0.520996 16.6496 -0.520996V1.479ZM1.89819 16.2305C1.89819 8.08345 8.50264 1.479 16.6496 1.479V-0.520996C7.39807 -0.520996 -0.101807 6.97888 -0.101807 16.2305H1.89819ZM16.6496 30.9819C8.50264 30.9819 1.89819 24.3775 1.89819 16.2305H-0.101807C-0.101807 25.482 7.39807 32.9819 16.6496 32.9819V30.9819ZM17.1295 30.9743C16.9702 30.9793 16.8102 30.9819 16.6496 30.9819V32.9819C16.8315 32.9819 17.0127 32.979 17.1933 32.9732L17.1295 30.9743ZM27.0559 33.084L17.3721 30.9962L16.9506 32.9513L26.6344 35.039L27.0559 33.084ZM24.8394 29.2394L25.8654 34.2617L27.8249 33.8614L26.7989 28.8391L24.8394 29.2394Z" fill="black" mask="url(#path-1-inside-1)"/>
</svg>
        </div>
      );
    //}
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
      <div
        key={this.props.post.id}
        className={[this.props.type, "postbody"].join(" ")}
      >
      <div className="deletePost">
      {this.props.post.author.username} ({this.props.post.createdAt})
      {this.showDelete()}
      </div>
         <br />{" "}
        {this.props.post.content}
        {this.conditionalDisplay()}
      </div>
      </div>
    );
  }
}