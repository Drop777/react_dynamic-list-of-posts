import React from 'react';
import './Commentlist.css';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

function Commentlist({ comments }) {
  return (
    <ul className="comments-list">
      {comments.map(comment => <Comment comment={comment} key={comment.id} />)}
    </ul>
  );
}

Commentlist.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      body: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default Commentlist;
