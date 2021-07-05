import React from "react";

import data from "../data/searchTwittesData";
import Input from "./input";

class SaveTweets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropTweetList: []
        }
    }

    componentDidMount() {
        const tweets = JSON.parse(localStorage.getItem("tweets"));
        this.setState({
            dropTweetList: tweets ? tweets : []
        })
    }

    allowDrop = (event) => {
        event.preventDefault();
        return false;
    }

    dropTweet = (event) => {
        event.preventDefault();
        const { tweetsList } = this.props;
        let tweetData = JSON.parse(event.dataTransfer.getData("dragContent"));
        const droppedTweets = tweetsList.filter((tweet) => {
            return tweet.id === tweetData.id
        });
        this.setState({
            dropTweetList: [...this.state.dropTweetList, ...droppedTweets]
        }, () => this.saveTweetsList(this.state.dropTweetList));
    }

    saveTweetsList = (data) => {
        localStorage.setItem("tweets", JSON.stringify(data));
    }

    renderTweets = () => {
        const { dropTweetList } = this.state;
        return dropTweetList.map((tweet) => {
            return (
                <li key={tweet.id}>
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

    render() {
        const { dropTweetList } = this.state;
        return (
            <div className="search-container">
                <p className="saved-tweet">Saved Tweets</p>
                <div className="tweet-search-list" onDrop={this.dropTweet} onDragOver={this.allowDrop}>
                    <ul>
                        {dropTweetList.length ? this.renderTweets() : null}
                    </ul>
                    <Input
                    type = "text"
                    />
                </div>
            </div>
        )
    }
};
export default SaveTweets;