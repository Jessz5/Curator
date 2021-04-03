import React, {Component} from 'react';
import '../searchpage.css';

import {Link} from 'react-router-dom';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      userPost: {embed: "", likes: 0, comments: []},
<<<<<<< HEAD
      img1: "", name1: "",
      img2: "", name2: "",
      img3: "", name3: "",
      img4: "", name4: "",
      img5: "", name5: "",

=======
      authToken: document.cookie.match('(^|)+' + sessionStorage.getItem("user") + '+=([^;]+)')?.pop() || '',
      result: {}
>>>>>>> 2bdb278cd401e19480f8826c2cb3f9c2c57d72b1
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
<<<<<<< HEAD
    fetch("https://api.spotify.com/v1/search", searchOptions)
    .then(res => res.json())
    .then(result => {console.log(result)})
    this.setState({
      img1: result.tracks.items[0].album.images[2], 
      img2: result.tracks.items[1].album.images[2],
      img3: result.tracks.items[2].album.images[2],
      img4: result.tracks.items[3].album.images[2],
      img5: result.tracks.items[4].album.images[2],
      name1: result.tracks.items[0].name,
      name2: result.tracks.items[1].name,
      name3: result.tracks.items[2].name,
      name4: result.tracks.items[3].name,
      name5: result.tracks.items[4].name,
    });
=======
    fetch(searchURL, searchOptions)
    .then(function (response) {
    return response.json();})
    .then( function (json) {console.log(json);})
    .catch(function (error) {console.log(error);});

>>>>>>> 2bdb278cd401e19480f8826c2cb3f9c2c57d72b1
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
             <div id="one" className="searchResults">
             <img src={this.img1} alt="Logo" />
             <span id="first">{this.name1}</span>
             </div>
             <div id="two" className="searchResults">
             <img src={this.img2} alt="Logo" />
             <span id="second">{this.name2}</span>
             </div>
             <div id="three" className="searchResults">
             <img src={this.img3} alt="Logo" />
             <span id="third">{this.name3}</span>
             </div>
             <div id="four" className="searchResults">
             <img src={this.img4} alt="Logo" />
             <span id="forth">{this.name4}</span>
             </div>
             <div id="five" className="searchResults">
             <img src={this.img5} alt="Logo" />
             <span id="fifth">{this.name5}</span>
             </div>
        </div>
    );
  }
}