import React from 'react';
import { PropTypes } from 'prop-types';
import { Footer } from '../components';

const AuthLayout = (props) => {
  const { children } = props;
  return (
    <>
      {children}
      <Footer />
    </>
  );
};
AuthLayout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AuthLayout;
