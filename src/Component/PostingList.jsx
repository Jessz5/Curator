import React from "react";
import Post from "./Post.jsx";

export default class PostingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      connections: [],
      filter: this.props.filter
    };
    this.postingList = React.createRef();
    this.loadPosts = this.loadPosts.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.filter !== prevProps.filter) {
      this.setState({ filter: this.props.filter });  
      this.loadPosts();
    }
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
    let urls=[]; 
    urls[0]="https://webdev.cse.buffalo.edu/hci/gme/api/api/posts?sort=newest&type=Post&authorID=" + sessionStorage.getItem("user");

    if(this.props.filter == 2){
      if(this.state.connections){
        urls = [];
        for(var key in this.state.connections){
          if (this.state.connections.hasOwnProperty(key)) {
            var val = this.state.connections[key];
            if(val.status != "blocked")
            {
              urls.push("https://webdev.cse.buffalo.edu/hci/gme/api/api/posts?sort=newest&type=Post&authorID=" + val["connectedUser"]["id"]);
            }
          }
        } 
      }
    }

    if(urls)
    {
      var headerOptions = {
        method: "get",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")}
        };

      

        Promise.all(urls.map(url => fetch(url,headerOptions)))
        .then(resp => Promise.all( resp.map(r => r.json())))
        .then(result => {
          var postList = [];
          var val;
          for(var key in result){
            if (result.hasOwnProperty(key)) {
              if(key != 0)
              {
                val = result[0][0].concat(result[key][0]);
              }
              else{
                val = result[0][0];
              }
              postList[0] = val;
            }
          
          }
          this.setState({
            isLoaded: true,
            posts: postList[0]
          });
          console.log("Got Posts");
          console.log(this.state.posts);
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
      return <div> No Posts Found </div>;
    }
  }
}
