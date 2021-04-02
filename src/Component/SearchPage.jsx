import React, {Component} from 'react';
import '../searchpage.css';

import {Link} from 'react-router-dom';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      userPost: {embed: "", likes: 0, comments: []},
      authToken: document.cookie.match('(^|)+' + sessionStorage.getItem("user") + '+=([^;]+)')?.pop() || '',
      result: {}
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

  searchInput = event => {

    event.preventDefault();

    let searchURL = new URL('https://api.spotify.com/v1/search');
    searchURL.search = new URLSearchParams({
      q: this.state.search,
      type:"track",
      market:"US",
      limit:"5",
      offset:"0"
    })

    //Construct the API call parameters
    var searchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.authToken,
      }
    };
    //Make the API call to the search page using the given parameters
    fetch(searchURL, searchOptions)
    .then(function (response) {
    return response.json();})
    .then( function (json) {console.log(json);})
    .catch(function (error) {console.log(error);});

  }

  render() {
    return (
        <div className="search-page">
            <div className="search-container">
                <form>
                    <input type="text" onChange={this.searchChangeHandler} />
                    <button className="Search" onClick={this.searchInput}>Search</button>
                    <button className="btn cancel" onClick={this.clearInput}>Cancel</button>
                </form>
             </div>
             <h2>Search Curator</h2>
             <div className="search-curator">
                 <h2>Search Curator</h2>
             </div>
             <div className="search-description">
                <p>Find your favorite songs right off of Spotify by searching for a track above!</p>
             </div>
        </div>
    );
  }
}