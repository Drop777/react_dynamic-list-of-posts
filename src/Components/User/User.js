import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

function User({ user }) {
  const {
    name, username, email, address,
  } = user;

  return (
    <div className="post__user">
      <p className="user__name">
        Name:
        {name}
      </p>
      <p className="user__username">
        Userame:
        {username}
      </p>
      <p className="user__email">
        Email:
        {email}
      </p>
      <p className="user__city">
        City:
        {address.city}
      </p>
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.object,
}.isRequired;

export default User;
