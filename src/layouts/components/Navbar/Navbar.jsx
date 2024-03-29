import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { textStyle } from './style';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Contact List
        </Typography>
        <Link style={textStyle.linkUnderline} to="/">
          <Button style={textStyle.textColor} color="inherit">Logout</Button>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
