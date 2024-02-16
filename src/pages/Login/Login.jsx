import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import * as Yup from 'yup';
import { getError, hasErrors, isTouched } from '../../helpers/helpers';

const Login = () => {
  const history = useHistory();
  const schemaErrors = {};
  let validationResult = {};
  const [loginValues, setLoginValues] = useState({
    email: '',
    touched: {},
    errors: {},
  });
  const { email, touched } = loginValues;

  const contactSchema = Yup.object({
    email: Yup.string().email('Email Address must be a valid email').label('Email').required(),
  });

  const handleErrors = (values) => {
    const {
      name: newName, email: newEmail,
    } = values;
    return contactSchema.validate({
      name: newName, email: newEmail,
    }, { abortEarly: false })
      .then(() => ({}))
      .catch((allErrors) => {
        if (allErrors) {
          allErrors.inner.forEach((err) => { schemaErrors[err.path] = err.message; });
        }
        return schemaErrors;
      });
  };

  const onChangeHandler = async (event, type) => {
    const { value } = event.target;
    touched[type] = true;
    const newValue = {
      ...loginValues,
      touched,
      [type]: value,
    };
    validationResult = await handleErrors(newValue);
    setLoginValues({ ...newValue, errors: validationResult });
  };

  const onBlurHandler = async (event, type) => {
    const { value } = event.target;
    if (value === '') {
      touched[type] = true;
      const newValue = {
        ...loginValues,
        touched,
      };
      validationResult = await handleErrors(newValue);
      setLoginValues({ ...newValue, errors: validationResult });
    }
  };

  const onLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/user-contacts-list/login', loginValues);
      const token = response.data.data;
      axios.defaults.headers.common['Authorization'] = `${token}`;
      history.push('/contacts')
      console.log('loggin successfully:', response.data);
    } catch (error) {
      console.error('Error loggin:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '56vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          >
            <Avatar
              sx={{
                bgcolor: red[500],
              }}
            >
              <LockRoundedIcon />
            </Avatar>
            <Typography variant="h5" component="div">
              Login
            </Typography>
          </Box>
          <TextField
            error={getError(loginValues, 'email')}
            label="Email"
            sx={{ my: 2 }}
            value={email}
            helperText={getError(loginValues, 'email')}
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
          <Button
            variant="contained"
            fullWidth
            sx={{ my: 2 }}
            disabled={hasErrors(loginValues?.errors) || !isTouched(loginValues?.touched)}
            onClick={onLoginSubmit}
          >
            LogIn
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
