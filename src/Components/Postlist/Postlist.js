import React from 'react';
import './Postlist.css';
import PropTypes from 'prop-types';

import Post from '../Post/Post';

function Postlist({
  posts,
  isLoaded,
  filterByTitle,
  filterByTitleReverse,
}) {
  return (
    <div className="post-list">
      {isLoaded && (
        <>
          <button
            type="button"
            onClick={() => filterByTitle(posts)}
          >
          Sort A-Z
          </button>
          <button
            type="button"
            onClick={() => filterByTitleReverse(posts)}
          >
          Sort Z-A
          </button>
        </>
      )}
      {posts.map(post => <Post post={post} key={post.id} />)}
    </div>
  );
}

Postlist.propTypes = {
  isLoaded: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ),
}.isRequired;

export default Postlist;
