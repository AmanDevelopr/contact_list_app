import moment from 'moment';

export const getError = (formValues, field) => {
  const { touched, errors } = formValues;
  if (touched[field]) {
    return errors[field] || '';
  }
  return false;
};

export const hasErrors = (errors) => Object.keys(errors).length !== 0;
export const isTouched = (touched) => Object.keys(touched).length !== 0;
export const getFormattedDate = (createdAt) => moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
