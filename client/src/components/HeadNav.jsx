/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function HeadNav(props) {
  // eslint-disable-next-line react/prop-types
  const { mainTitle } = props;
  return (
    <header className="flex boder border-b-2 border-gray-400 justify-center items-center px-4 py-2">
      {/* Brand Name */}
      <div className="text-2xl font-bold  text-red-600 p">
        <Link to="/">{mainTitle}</Link>
      </div>
      {/* Call To Action */}
      <Link to="tel:+917517329166" className="text-2xl absolute right-5 text-gray-500 cursor-pointer hover:scale-110"><FiPhoneCall className="text-red-600 " /></Link>
    </header>
  );
}

export default HeadNav;

HeadNav.prototype = {
  mainTitle: PropTypes.string,
};
