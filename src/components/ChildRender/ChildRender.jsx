import React from 'react';
import { Typography } from '@mui/material/';
import { PropTypes } from 'prop-types';
import { MathResult } from '../../configs/constants';

const ChildRender = (props) => {
  const {
    first, second, operator, result,
  } = props;
  return (
    <div>
      <Typography>
        <MathResult first={first} second={second} operator={operator} result={result} />
      </Typography>
    </div>
  );
};

ChildRender.propTypes = {
  result: PropTypes.number.isRequired,
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
};
export default ChildRender;
