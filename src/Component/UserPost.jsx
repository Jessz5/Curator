import React from "react";
import { Link } from "react-router-dom";
import "../UserPost.css";
import Navbar from "./Navbar.jsx";
import PostingList from "./PostingList";
export default class UserPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : []


        };

    }
    componentDidMount() {


    };


    submitHandler = event => {
        //keep the form from actually submitting
        event.preventDefault();
    }
    
    myChangeHandler = event => {
        this.setState({
        post_text: event.target.value
        });
    };


    render() {
    return (
      <div id="PostGrid">
          <Navbar/> 
        <div className="SongInfo">
            <PostingList/>

            {this.state.posts.map(name =>
                <iframe id="test" src={this.embed_song(name)} width="300" height="300" frameBorder="0" allowTransparency="true" allow="encrypted-media" />
            )}
        </div>


    </div>
    );
  }
}
