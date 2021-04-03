import React, {Component} from 'react';
import '../searchpage.css';

import {Link} from 'react-router-dom';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      userPost: {embed: "", likes: 0, comments: []},
      img1: "#", name1: "",
      img2: "#", name2: "",
      img3: "#", name3: "",
      img4: "#", name4: "",
      img5: "#", name5: "",
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
    .then(res => res.json())
    .then(result => {console.log(result); this.setState({
          result: result,
          img1: result.tracks.items[0].album.images[2].url, 
          img2: result.tracks.items[1].album.images[2].url,
          img3: result.tracks.items[2].album.images[2].url,
          img4: result.tracks.items[3].album.images[2].url,
          img5: result.tracks.items[4].album.images[2].url,
          name1: result.tracks.items[0].name,
          name2: result.tracks.items[1].name,
          name3: result.tracks.items[2].name,
          name4: result.tracks.items[3].name,
          name5: result.tracks.items[4].name,
        });
      }
    )
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
             <img src={this.state.img1} onerror="this.style.display='none'" alt="Logo" />
             <span id="first">{this.state.name1}</span>
             <button className="Post" onClick={console.log("Pushed")}>Share Song</button>
             </div>
             <div id="two" className="searchResults">
             <img src={this.state.img2} onerror="this.style.display='none'" alt="Logo" />
             <span id="second">{this.state.name2}</span>
             <button className="Post" onClick={console.log("Pushed")}>Share Song</button>
             </div>
             <div id="three" className="searchResults">
             <img src={this.state.img3} onerror="this.style.display='none'" alt="Logo" />
             <span id="third">{this.state.name3}</span>
             <button className="Post" onClick={console.log("Pushed")}>Share Song</button>
             </div>
             <div id="four" className="searchResults">
             <img src={this.state.img4} onerror="this.style.display='none'" alt="Logo" />
             <span id="forth">{this.state.name4}</span>
             <button className="Post" onClick={console.log("Pushed")}>Share Song</button>
             </div>
             <div id="five" className="searchResults">
             <img src={this.state.img5} onerror="this.style.display='none'" alt="Logo" />
             <span id="fifth">{this.state.name5}</span>
             <button className="Post" onClick={console.log("Pushed")}>Share Song</button>
             </div>
        </div>
    );
  }
}