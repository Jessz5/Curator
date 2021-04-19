import React from "react";
import Post from "./Post.jsx";

export default class PostingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      url: "",
      isLoaded: false,
      posts: [],
      connections: [],
      listType: props.listType
    };
    this.postingList = React.createRef();
    this.loadPosts = this.loadPosts.bind(this);
  }

  componentDidMount() {
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
            connections: result[0]
          });
          console.log(result);
        }
      },
      error => {
          console.log("Error During Fetch Friend");
      }
    );

    this.loadPosts();

  }

  loadPosts() {
    if(this.props.filter == 1){
      this.setState({
        url: "https://webdev.cse.buffalo.edu/hci/gme/api/api/posts?sort=newest&type=Post&authorID=" + sessionStorage.getItem("user")
      });
      
    }
    else if (this.props.filter == 2){
      this.setState({
        url: "https://webdev.cse.buffalo.edu/hci/gme/api/api/posts?sort=newest&type=Post&authorID=" + sessionStorage.getItem("user")
      });
    }
    else{
      this.setState({
        url: "https://webdev.cse.buffalo.edu/hci/gme/api/api/posts?sort=newest&type=Post&authorID=" + sessionStorage.getItem("user")
      });
    }

    if(this.state.url != "")
    {
      fetch(this.state.url, {
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
            console.log("Got Posts");
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
  }

  render() {
    const {error, isLoaded, posts} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else if (posts) {

      if (posts.length > 0){
      return (

        <div className="posts">

          {posts.map(post => (
            <Post key={post.id} post={post} type={this.props.type} loadPosts={this.loadPosts}/>
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
}
