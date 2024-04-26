import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ButtonProduct, FlexCenter } from '../assets/styles/Styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import img1 from '../assets/images/pexels-polina-tankilevitch-4109233.jpg';

const Header = ({ mode, setMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const Logout = () => {
        sessionStorage.removeItem('userInfo');
        window.location.reload();
        navigate('/')
    }

    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
            }}
        >
            <Toolbar>
                <FlexCenter onClick={() => navigate('/')}>
                    {!matches ?
                        <img
                            src={img1}
                            alt=''
                            height={'50px'}
                            width={'50px'}
                        /> :
                        null
                    }

                    <Typography variant='h5' sx={{ fontFamily: 'Dancing Script', cursor:'pointer' }}>
                        &nbsp;GG-Recipe App
                    </Typography>
                </FlexCenter>

                <Box sx={{ ml: 'auto' }}>
                    {userInfo !== null ?
                        <>
                            {!matches ?
                                <ButtonProduct onClick={() => navigate('/myrecipes')}>
                                    <Typography variant='body2'>
                                        My Recipes
                                    </Typography>
                                </ButtonProduct> :
                                <IconButton
                                    sx={{ bgcolor: 'background.default' }}
                                    onClick={() => navigate('/myrecipes')}
                                >
                                    <Tooltip title="My Recipes">
                                        <FavoriteIcon />
                                    </Tooltip>
                                </IconButton>
                            }

                            {!matches ?
                                <ButtonProduct onClick={() => navigate('/savedrecipes')}>
                                    <Typography variant='body2'>
                                        Saved Recipes
                                    </Typography>
                                </ButtonProduct> :

                                <IconButton
                                    sx={{ bgcolor: 'background.default' }}
                                    onClick={() => navigate('/savedrecipes')}
                                >
                                    <Tooltip title="Saved Recipes">
                                        <BookmarkIcon />
                                    </Tooltip>
                                </IconButton>
                            }
                        </> :
                        null
                    }

                    <IconButton
                        sx={{ bgcolor: 'background.default' }}
                        onClick={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}
                    >
                        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>

                    {location.pathname.includes('/login') ?
                        null :
                        <>
                            {matches ?
                                <IconButton
                                    sx={{ bgcolor: 'background.default' }}
                                    onClick={() => userInfo === null ? navigate('/login') : Logout()}
                                >
                                    {userInfo === null ? <LoginIcon /> : <LogoutIcon />}
                                </IconButton> :
                                <ButtonProduct
                                    onClick={() => userInfo === null ? navigate('/login') : Logout()}
                                >
                                    <Typography variant='body2'>
                                        {userInfo === null ? 'Login' : 'Logout'}
                                    </Typography>
                                </ButtonProduct>
                            }
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
