import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';

import User from '../User/User';
import Commentlist from '../Commentlist/Commentlist';

function Post({ post }) {
  const { user, comments } = post;

  return (
    <div className="post">
      <h2 className="post__title">{post.title}</h2>
      <p className="post__body">{post.body}</p>
      <User user={user} />
      <Commentlist comments={comments} />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        adress: PropTypes.shape({
          street: PropTypes.string,
          suite: PropTypes.string,
          city: PropTypes.string,
        }).isRequired,
      }).isRequired,
    ).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape(
        PropTypes.shape({
          body: PropTypes.string,
          email: PropTypes.string,
          name: PropTypes.string,
        }).isRequired,
      ).isRequired,
    ).isRequired,
  }).isRequired,
};

export default Post;
