import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material/';
import { BrowserRouter, Switch } from 'react-router-dom';
import { theme } from './theme';
import { PrivateRoute, AuthRoute } from './routes';
import {ContactsList, Login
} from './pages';
import { SnackBarProvider } from './contexts';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Typography>
          <SnackBarProvider>
            <Switch>
              <AuthRoute exact path="/" component={Login} />
              <PrivateRoute exact path="/contacts" component={() => <ContactsList />} />
            </Switch>
          </SnackBarProvider>
        </Typography>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
