import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material/';

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;
  let result = props;

  switch (operator) {
  case '+':
    result = first + second;
    break;
  case '-':
    result = first - second;
    break;
  case '*':
    result = first * second;
    break;
  case '/':
    result = first / second;
    break;

  default:
    result = 'Invalid operator';
    break;
  }

  return (
    <Typography>
      {first}
      {operator}
      {second}
      =
      {result}
      {React.cloneElement(children, {
        first, second, operator, result,
      })}
    </Typography>
  );
};
Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Math;
