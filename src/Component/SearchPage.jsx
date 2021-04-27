import React, {Component} from 'react';
import '../App.css';
import Navbar from "./Navbar";
import {Redirect} from 'react-router';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            imgs: [],
            names: [],
            uris: [],
            authToken: document.cookie.match('(^|)+' + sessionStorage.getItem("user") + '+=([^;]+)')?.pop() || '',
            result: {},
            isHidden: true,
            redirect: false

        };

    }

    searchChangeHandler = event => {
        this.setState({
            search: event.target.value
        });
    };

    clearInput = () => {
        this.setState({
            search: "",
            isHidden: true
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
            .then(result => {console.log(result); 
                try{
                    this.setState({
                        result: result,
                        imgs: result.tracks.items.map(e => e.album.images[2].url),
                        names: result.tracks.items.map(e => e.name),
                        uris: result.tracks.items.map(e => e.uri),
                        isHidden: false
                });
                }
                catch{
                    console.log("result undefined")
                }

                }
            )
    }

    embed_song(id) {

        var str1 = id;
        var str2 = "https://open.spotify.com/embed/track/";
        var res = str1.slice(14,36);
        var str3 = str2.concat(res);
        return str3

    };
    find_song = event => {
        event.preventDefault();

        //Construct the API call parameters
        var searchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                authorID: sessionStorage.getItem("user"),
                content: this.embed_song(this.state.uris[event.currentTarget.value]),
                type: "Post",
            })
            
        };

        fetch("https://webdev.cse.buffalo.edu/hci/gme/api/api/posts/", searchOptions)
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        responseMessage: result.Status
                    });
                },
                error => {
                    alert("error!");
                }
            )
            .then(() => this.setState({ redirect: true }));
            
           
         
             
    };
    render() {
        const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/UserPost'/>;
     }
        return (
            <div className="search-page">
                <div className="search-container">
                    <form>
                        <input id="searchBar" type="text" placeholder="Search Curator for songs and share" onChange={this.searchChangeHandler} />
                        <button className="searchButton" onClick={this.searchInput}>Search</button>
                        <button className="cancel" onClick={this.clearInput}>Cancel</button>
                    </form>
                </div>
                <div className="resultContainer">
                <div id="one" className="searchResults">
                        <img className="songCover" src={this.state.imgs[0]} onerror="this.style.display='none'" alt="" />
                        <span className="songName">{this.state.names[0]}</span>
                        <button  style={{display: this.state.isHidden ? 'none': 'block'}} className="Post" value={0} onClick={this.find_song}>Share</button>
                    </div>
                    <div id="two" className="searchResults">
                        <img className="songCover" src={this.state.imgs[1]} onerror="this.style.display='none'" alt="" />
                        <span className="songName" >{this.state.names[1]}</span>
                        <button style={{display: this.state.isHidden ? 'none': 'block'}} className="Post" value={1} onClick={this.find_song}>Share</button>
                    </div>
                    <div id="three" className="searchResults">
                        <img className="songCover" src={this.state.imgs[2]} onerror="this.style.display='none'" alt="" />
                        <span className="songName">{this.state.names[2]}</span>
                        <button style={{display: this.state.isHidden ? 'none': 'block'}} className="Post" value={2} onClick={this.find_song}>Share</button>
                    </div>
                    <div id="four" className="searchResults">
                        <img className="songCover" src={this.state.imgs[3]} onerror="this.style.display='none'" alt="" />
                        <span className="songName" >{this.state.names[3]}</span>
                        <button style={{display: this.state.isHidden ? 'none': 'block'}} className="Post" value={3} onClick={this.find_song}>Share</button>
                    </div>
                    <div id="five" className="searchResults">
                        <img className="songCover" src={this.state.imgs[4]} onerror="this.style.display='none'" alt="" />
                        <span  className="songName">{this.state.names[4]}</span>
                        <button style={{display: this.state.isHidden ? 'none': 'block'}} className="Post" value={4} onClick={this.find_song}>Share</button>
                    </div>
                </div>
                
            </div>
        );
    }
}
