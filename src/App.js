import React from 'react';
import './App.css';
import Postlist from './Components/Postlist/Postlist';

// const ConsolidatedList = (postApi, commentsApi, usersApi) => postApi.map(
//   post => ({
//     ...post,
//     user: usersApi.find(user => user.id === post.userId),
//     comments: commentsApi.filter(comment => comment.postId === post.id),
//   })
// );

// const listWithUsersCommentsPosts = ConsolidatedList(posts, comments, users);

const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const COMENTS_API = 'https://jsonplaceholder.typicode.com/comments';

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

    Promise.all([fetch(POSTS_API), fetch(USERS_API), fetch(COMENTS_API)])
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
