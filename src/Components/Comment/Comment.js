import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';
import Userincomment from '../Userincomments/Userincomment';

function Comment({ comment }) {
  const { body } = comment;

  return (
    <div className="comment-item">
      <li className="comment-text">{body}</li>
      <Userincomment user={comment.email} />
    </div>
  );
}

Comment.propTypes = PropTypes.shape({
  body: PropTypes.string,
  email: PropTypes.string,
}).isRequired;

export default Comment;
