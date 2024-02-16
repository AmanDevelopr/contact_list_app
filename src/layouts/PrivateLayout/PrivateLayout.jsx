import React from 'react';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <Box m={2}>{children}</Box>
    </>
  );
};
PrivateLayout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PrivateLayout;
