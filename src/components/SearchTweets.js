import React from "react";

import data from "../data/searchTwittesData";

class SearchTweets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetsList: [],
            tweetText: "",
            showTweets: false
        }
    }

    handleTweet = (event) => {
        this.setState({
            tweetText: event.target.value
        })
    }

    handleSearchTweets = (event) => {
        const { tweetText } = this.state;
        event.preventDefault();
        if (tweetText) {
            this.props.searchTweets(tweetText);
        }
    };

    handleDragStart = (tweet, event) => {
        let tweetData = JSON.stringify({ id: tweet.id });
        event.dataTransfer.setData("dragContent", tweetData);
    }

    renderTweets = () => {
        const { tweetsList } = this.state;
        return tweetsList.map((tweet) => {
            return (
                <li draggable="true" onDragStart={(event) => this.handleDragStart(tweet, event)} key={tweet.id}>
                    <div className="tweet">
                        <div>
                            <span>{tweet.user.name}</span>
                            <span>  @{tweet.user.screenName}</span>
                        </div>
                        <span>{tweet.text}</span>
                    </div>
                </li>
            )
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tweetsList: nextProps.tweetsList,
            showTweets: true
        })
    }

    render() {
        const { tweetText, showTweets } = this.state;
        return (
            <div className="search-container">
                <form onSubmit={this.handleSearchTweets}>
                    <input type="text" placeholder="Search Twitter" name="search" value={tweetText} onChange={this.handleTweet} autoComplete="off" />
                    <button type="submit">Search</button>
                </form>
                <div className="tweet-search-list">
                    <ul>
                        {showTweets ? this.renderTweets() : null}
                    </ul>
                </div>
            </div>
        )
    }
};

export default SearchTweets;