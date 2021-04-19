import { ThumbUpSharp } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "../UserPost.css";
import Navbar from "./Navbar.jsx";
import PostingList from "./PostingList";
export default class UserPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenFilter: 1
        };

    }

    submitHandler = event => {
        //keep the form from actually submitting
        event.preventDefault();
    }
    
    myChangeHandler = event => {
        this.setState({
        post_text: event.target.value
        });
    };

    applyFilter = (event) => {
        switch(event.target.value)
        {
            case 1:
                this.setState({
                    chosenFilter: 1
                });
            case 2:
                this.setState({
                    chosenFilter: 2
                });
            case 3:
                this.setState({
                    chosenFilter: 3
                });
        }
    }


    render() {
    return (
      <div id="PostGrid">
        <Navbar/> 
        <div id="PostHeader">
                    <label id="radioLabel">
                    <input type="radio" name="selfPosts" value={1} checked={this.state.chosenFilter == 1} onChange={() => this.applyFilter()} /> 
                    My Posts
                    </label>
                    <label id="radioLabel">
                    <input type="radio" name="friendPosts" value={2} checked={this.state.chosenFilter == 2} onChange={() => this.applyFilter()}/> 
                    Friends
                    </label>
                    <label id="radioLabel">
                    <input type="radio" name="similarPosts" value={3} checked={this.state.chosenFilter == 3} onChange={() => this.applyFilter()}/> 
                    Similar 
                    </label>
                    </div>
        <div className="SongInfo">
            <PostingList filter={this.chosenFilter}/>
        </div>


    </div>
    );
  }
}
