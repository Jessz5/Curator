import React, {Component} from 'react';
import '../App.css';
import Navbar from "./Navbar";

import {Link} from 'react-router-dom';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  searchChangeHandler = event => {
    this.setState({
        search: event.target.value
    });
  };

  clearInput = () => {
    this.setState({
            search: ""
        });
  }

  render() {
    return (
      <div className="PostGrid">
      <div className="NavContainer">
        <Navbar/>
      </div>
    <div className="Right-offset"></div>
    <div className="Left-Offset"></div>
    <div className="Post1">
    <div className="search-container">
    <h2 id="SearchTitle">Search Curator</h2>
                <form id="searchform">
                    <input id="searchbar" placeholder = "search for friends,tracks and playlists" type="text" onChange={this.searchChangeHandler} />
                    <button class="btn cancel" onClick={this.clearInput}>Cancel</button>
                </form>
             </div>
    </div>
    <div className="Post2"></div>
    <div className="Post3">
             <div className="search-curator">
                 <div className="search-description">
             </div>
             </div>
             
    </div>
    <div className="Post4"></div>
    <div className="Post5"></div>
    <div className="Post6"></div>
      </div>
            
             
        
    );
  }
}