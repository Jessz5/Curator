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
        if(event.target.value == 1)
        {
            this.setState({
                chosenFilter: 1
            });
        }
        else if (event.target.value == 2)
        {
            this.setState({
                chosenFilter: 2
            });
        }
        else{
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
                    <input type="radio" name="selfPosts" value={1} checked={this.state.chosenFilter == 1} onChange={(event) => this.applyFilter(event)} /> 
                    My Posts
                    </label>
                    <label id="radioLabel">
                    <input type="radio" name="friendPosts" value={2} checked={this.state.chosenFilter == 2} onChange={(event) => this.applyFilter(event)}/> 
                    Friends
                    </label>
                    <label id="radioLabel">
                    <input type="radio" name="similarPosts" value={3} checked={this.state.chosenFilter == 3} onChange={(event) => this.applyFilter(event)}/> 
                    Similar 
                    </label>
                    </div>
        <div className="SongInfo">
            <PostingList filter={this.state.chosenFilter}/>
        </div>


    </div>
    );
  }
}
