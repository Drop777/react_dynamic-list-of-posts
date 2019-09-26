import React from 'react';
import './App.css';
import Postlist from './Components/Postlist/Postlist';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

class App extends React.Component {
  state = {
    listWithUsersCommentsPosts: [],
    filteredList: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  };

  getPosts = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(`${BASE_URL}posts`),
      fetch(`${BASE_URL}users`),
      fetch(`${BASE_URL}comments`),
    ])
      .then(responses => Promise.all(responses.map(respons => respons.json())))
      .then(([postsDate, usersDate, commentsDate]) => this.setState({
        listWithUsersCommentsPosts: postsDate.map(
          post => ({
            ...post,
            user: usersDate.find(user => user.id === post.userId),
            comments: commentsDate.filter(
              comment => comment.postId === post.id
            ),
          })
        ),
        isLoading: false,
        isLoaded: true,
        hasError: false,
      }))
      .catch(() => this.setState({
        hasError: true,
        isLoading: false,
      }));
  }

  filterByTitle = posts => (
    this.setState({
      filteredList: posts.sort((a, b) => (a.title > b.title ? 1 : -1)),
    })
  )

  filterByTitleReverse = posts => (
    this.setState({
      filteredList: posts.sort(
        (a, b) => (a.title > b.title ? 1 : -1)
      ).reverse(),
    })
  )

  render() {
    const {
      listWithUsersCommentsPosts,
      isLoading, isLoaded,
      filteredList,
      hasError,
    } = this.state;

    if (hasError) {
      return (
        <>
          <p>Some problems...</p>
          <button
            type="button"
            onClick={this.getPosts}
            disabled={isLoading}
          >
            {isLoading
              ? 'Loading...'
              : 'Reload'}
          </button>
        </>
      );
    }

    return (
      <div className="App">
        <h1>List of Posts</h1>
        {!isLoaded && (
          <button
            type="button"
            onClick={this.getPosts}
            disabled={isLoading}
          >
            {isLoading
              ? 'Loading...'
              : 'Load'}
          </button>
        )}
        <Postlist
          posts={listWithUsersCommentsPosts}
          isLoaded={isLoaded}
          filteredList={filteredList}
          filterByTitle={this.filterByTitle}
          filterByTitleReverse={this.filterByTitleReverse}
          reset={this.reset}
        />
      </div>
    );
  }
}

export default App;
