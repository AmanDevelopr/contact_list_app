import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { getError, hasErrors, isTouched } from '../../../../helpers/helpers';

const AddDialog = (props) => {
  const {
    open, onClose, onSubmit, onChangeHandler, onBlurHandler, allValues,
  } = props;
  const {
    name, email, phoneNumber, errors, touched,
  } = allValues;
  const onDisable = (e, t) => (
    hasErrors(e) || !isTouched(t)
  );
  return (
    <Box mt={2}>
      <Dialog open={open}>
        <DialogTitle>Add Contacts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Your Contacts Details
          </DialogContentText>
          <br />
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                error={getError(allValues, 'name')}
                label="Name"
                value={name}
                helperText={getError(allValues, 'name')}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'name'); }}
                onBlur={(event) => { onBlurHandler(event, 'name'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={getError(allValues, 'email')}
                label="Email"
                value={email}
                helperText={getError(allValues, 'email')}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'email'); }}
                onBlur={(event) => { onBlurHandler(event, 'email'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={getError(allValues, 'phoneNumber')}
                label="Contact No."
                value={phoneNumber}
                helperText={getError(allValues, 'phoneNumber')}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'phoneNumber'); }}
                onBlur={(event) => { onBlurHandler(event, 'phoneNumber'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneAndroidIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={onSubmit}
            disabled={onDisable(errors, touched)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

AddDialog.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  allValues: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AddDialog;
