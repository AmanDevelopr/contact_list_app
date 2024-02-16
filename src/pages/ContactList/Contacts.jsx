import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import ContactDetail from './ContactDetails';
import ContactsList from './ContactsList';

const Contacts = ({ match: { path } }) => (
  <Switch>
    <Route exact path={path} component={ContactsList} />
    <Route exact path={`${path}/:id`} component={ContactDetail} />
  </Switch>
);

Contacts.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Contacts;
