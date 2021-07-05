import React from 'react';

import Header from "./components/Header";
import SearchTweets from "./components/SearchTweets";
import SaveTweets from "./components/SaveTweets";

import './App.css';


class App extends React.Component() {
  constructor(props) {
    super(props);
    this.state = {
      tweetsList: []
    }
  };

  searchTweets = (data) => {
    // API call here
    this.setState({
      tweetsList: tweetsList
    })
  }

  render() {
    const { tweetsList } = this.state;
    return (
      <React.Fragment >
        <Header />
        <SearchTweets searchTweets={this.searchTweets} tweetsList={tweetsList} />
        <SaveTweets tweetsList={tweetsList} />
      </React.Fragment>
    )
  }
}

export default App;
