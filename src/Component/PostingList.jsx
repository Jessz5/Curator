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

  //blocked users
   loadBlockedUsers() {
      //gets all the blocked users
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
            let blockedConnections = [];
            for(var i = 0; i < result[1]; i++){
               if(result[0][i].status == "blocked"){
                   //console.log(result[0][i])
                   blockedConnections.push(result[0][i])
               }
            }
            //This prints the correct result
            console.log(blockedConnections)
            this.setState({
                isLoaded: true,
                connections: blockedConnections
            });
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }

  //active users
   loadActiveUsers() {
      //gets all the active users
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
            let activeConnections = [];
            for(var i = 0; i < result[1]; i++){
               if(result[0][i].status == "active"){
                   //console.log(result[0][i])
                   activeConnections.push(result[0][i])
               }
            }
            //This prints the correct result
            console.log(activeConnections)
            this.setState({
                isLoaded: true,
                connections: activeConnections
            });
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }

  componentDidMount() {
  //this.loadBlockedUsers();
  this.loadActiveUsers();

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
        for(var key in this.state.connections){
          if (this.state.connections.hasOwnProperty(key)) {
            var val = this.state.connections[key];
            console.log(val);
          }
        } 
      }
    }
    else if(this.props.filter==3){
      urls[0] = "https://webdev.cse.buffalo.edu/hci/gme/api/api/posts?sort=newest&type=Post&authorID=" + sessionStorage.getItem("user")
      
    }

    if(urls)
    {
      var headerOptions = {
        method: "get",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")}
        };

      

        var promises = urls.map(url => fetch(url).then(y => y));
        Promise.all(promises).then(results => {
            console.log(results);
        });


      fetch(urls[0], {
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
