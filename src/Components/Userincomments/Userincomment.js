import React from 'react';
import './Userincomments.css';
import PropTypes from 'prop-types';

function Userincomment({ user }) {
  return (
    <>
      <p className="user__email">
      Email:
        {user}
      </p>
    </>
  );
}

Userincomment.propTypes = ({
  user: PropTypes.string,
}).isRequired;

export default Userincomment;
