import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDialog, EditDialog } from './components';
import RemoveDialog from './components/RemoveDialog/RemoveDialog';
import { GenericTable } from '../../components';
import { Columns } from '../../configs/constants';
import { SnackBarContext } from '../../contexts/SnackBarProvider/SnackBarProvider';

const ContactsList = ({ match, history }) => {
  const schemaErrors = {};
  let validationResult = {};
  const openSnackBar = useContext(SnackBarContext);
  const [dialog, setDialog] = useState({
    addDialog: false,
    editDialog: false,
    removeDialog: false,
  });
  const [userData, setUserData] = useState([]);
  const [editFormValues, setEditFormValues] = useState({
    originalId: '',
    name: '',
    email: '',
    phoneNumber: '',
    touched: {},
  });
  const [deleteFormValues, setdeleteFormValues] = useState({
    originalId: '',
    name: '',
    email: '',
    phoneNumber: '',
    touched: {},
  });
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    touched: {},
    errors: {},
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/user-contacts-list');
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const { touched } = formValues;

  const contactSchema = Yup.object({
    name: Yup.string().min(3).max(10).label('Name')
      .required(),
    email: Yup.string().email('Email Address must be a valid email').label('Email').required(),
    phoneNumber: Yup.string().label('Contact').required(),
  });

  /**    Form Validation  */

  const handleErrors = (values) => {
    const {
      name: newName, email: newEmail, phoneNumber: newPhoneNumber,
    } = values;
    return contactSchema.validate({
      name: newName, email: newEmail, phoneNumber: newPhoneNumber,
    }, { abortEarly: false })
      .then(() => ({}))
      .catch((allErrors) => {
        if (allErrors) {
          allErrors.inner.forEach((err) => { schemaErrors[err.path] = err.message; });
        }
        return schemaErrors;
      });
  };

  const handleAddDialogOpen = () => {
    setDialog({ ...dialog, addDialog: true });
  };

  const onChangeHandler = async (event, type) => {
    const { value = '' } = event.target;
    touched[type] = true;
    const newValue = {
      ...formValues,
      touched,
      [type]: value,
    };
    validationResult = await handleErrors(newValue);
    setFormValues({ ...newValue, errors: validationResult });
  };

  const onBlurHandler = async (event, type) => {
    const { value = '' } = event.target;
    if (value === '') {
      touched[type] = true;
      const newValue = {
        ...formValues,
        touched,
      };
      validationResult = await handleErrors(newValue);
      setFormValues({ ...newValue, errors: validationResult });
    }
  };

  /**   Dialogbox Handlers    */

  const handleAddDialogClose = () => {
    setDialog({ ...dialog, addDialog: false });
  };

  const handleEditDialogOpen = ({ name, email, phoneNumber, originalId }) => {
    setEditFormValues({ ...editFormValues, name, email, phoneNumber, originalId });
    setDialog({ ...dialog, editDialog: true });
  };

  const handleEditDialogClose = () => {
    setDialog({ ...dialog, editDialog: false });
  };

  const handleRemoveDialogOpen = ({ name, email, phoneNumber, originalId }) => {
    setdeleteFormValues({ ...deleteFormValues, name, email, phoneNumber, originalId });
    setDialog({ ...dialog, removeDialog: true });
  };

  const handleRemoveDialogClose = () => {
    setDialog({ ...dialog, removeDialog: false });
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/user-contacts-list', formValues);
      console.log('Contact added successfully:', response.data);
      handleAddDialogClose();
      fetchUserData();
      openSnackBar('Contact Added Successfully', 'success');
    } catch (error) {
      console.error('Error adding contact:', error);
      openSnackBar('Failed to add contact', 'error');
    }
  };

  /** User Handlers */
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/user-contacts-list/${deleteFormValues.originalId}`, deleteFormValues);
      console.log('Contact deleted successfully:', response.data);
      handleRemoveDialogClose();
      fetchUserData();
      openSnackBar('Contact deleted Successfully', 'success');
    } catch (error) {
      console.error('Error deleted contact:', error);
      openSnackBar('Failed to deleted contact', 'error');
    }
  };

  const handleChangeData = (event, type) => {
    const { value = '' } = event.target;
    touched[type] = true;
    const newValue = {
      ...editFormValues,
      touched,
      [type]: value,
    };
    setEditFormValues(newValue);
  };

  const onEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:9000/api/user-contacts-list`, editFormValues);
      console.log('Contact updated successfully:', response.data);
      handleEditDialogClose();
      fetchUserData();
      openSnackBar('Contact updated Successfully', 'success');
    } catch (error) {
      console.error('Error updated contact:', error);
      openSnackBar('Failed to updated contact', 'error');
    }
  };
  return (
    <>
      <Button variant="outlined" onClick={handleAddDialogOpen}>
        Add Contacts
      </Button>
      <AddDialog
        open={dialog?.addDialog}
        onClose={handleAddDialogClose}
        onBlurHandler={onBlurHandler}
        onChangeHandler={onChangeHandler}
        allValues={formValues}
        onSubmit={onSubmit}
      />
      <EditDialog
        open={dialog?.editDialog}
        editData={editFormValues}
        onClose={handleEditDialogClose}
        onHandleChangeData={handleChangeData}
        onSubmit={onEditSubmit}
      />
      <RemoveDialog
        open={dialog?.removeDialog}
        onClose={handleRemoveDialogClose}
        onDelete={handleDeleteUser}
      />
      <Box sx={{ margin: '20px' }}>
        <GenericTable
          id="id"
          data={userData}
          columns={Columns}
          actions={
            [
              {
                icon: <EditIcon />,
                handler: handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: handleRemoveDialogOpen,
              },
            ]
          }
        />
      </Box>
    </>
  );
};

ContactsList.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ContactsList;
