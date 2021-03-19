import React, {Component} from 'react';
import '../searchpage.css';

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
        <div className="search-page">
            <div className="search-container">
                <form>
                    <input type="text" onChange={this.searchChangeHandler} />
                    <button class="btn cancel" onclick={this.clearInput}>Cancel</button>
                </form>
             </div>
             <h2>Search Curator</h2>
             <div className="search-curator">
                 <h2>Search Curator</h2>
             </div>
             <div className="search-description">
                <p>Find your favorite song clips, accounts, friends, and interesting posts</p>
             </div>
        </div>
    );
  }
}