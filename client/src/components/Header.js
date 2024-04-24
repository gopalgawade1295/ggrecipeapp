import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ButtonProduct } from '../assets/styles/Styles';

const Header = ({ mode, setMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(userInfo, "kk")

    const Logout = () => {
        sessionStorage.removeItem('userInfo');
        window.location.reload();
    }

    return (
        <AppBar
            elevation={0}
            sx={{ backgroundColor: 'background.default', color: 'text.primary', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' }}
        >
            <Toolbar>
                <Typography variant='h5'>
                    GG-Recipe App
                </Typography>

                <Box sx={{ ml: 'auto' }}>
                    <IconButton sx={{ bgcolor: 'background.default' }} onClick={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}>
                        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>

                    {location.pathname.includes('/login') ?
                        null :
                        <ButtonProduct onClick={() => userInfo === null ? navigate('/login') : Logout()}>
                            <Typography variant='body2'>
                                {userInfo === null ? 'Login' : 'Logout'}
                            </Typography>
                        </ButtonProduct>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
