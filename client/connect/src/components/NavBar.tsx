import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Avatar, Icon, Menu, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AddBoxIcon from '@mui/icons-material/AddBox';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const navigate = useNavigate()

    return (
        <div className='NavBar'>
            <AppBar position="static" >
                <Container maxWidth="xl">
                    <div className="more-icon">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            className="more-icon"
                            onClick={() => navigate('/new')}
                        >
                            <AddBoxIcon />
                        </IconButton>

                    </div>
                </Container>
            </AppBar>
        </div>
    );
}
export default ResponsiveAppBar;
