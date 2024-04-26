import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Recipe from '../components/Recipe';
import SkeletonCard from '../components/SkeletonCard';
import { Box, Grid, IconButton, Typography, InputAdornment, TextField, useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress } from '@mui/material';
import success from '../assets/images/success.png';
import error from '../assets/images/error.png';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [ids, setIds] = useState([]);
    const outerTheme = useTheme();
    const Smalldialog = useMediaQuery(outerTheme.breakpoints.down('sm'));
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    const getRecipes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}/recipes`);
            const data = await res.data;
            setRecipes(data);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const savedRecipesID = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}/recipes/savedRecipes/ids/${userInfo.userID}`);
            const data = await res.data;
            setIds(data?.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const saveRecipe = async (key) => {
        setMessage("Please wait!");
        setDescription("Please do not close the window or go back");
        setOpen(true);
        try {
            setTimeout(() => {
                setOpen(false)
                setMessage("");
                setDescription("");
            }, [2000])
            const res = await axios.put(`${process.env.REACT_APP_SECRET_KEY}/recipes`, {
                userID: userInfo.userID,
                recipeID: key
            });
            const data = await res.data;
            setMessage("Success!");
            setDescription("Saved Successfully.");
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
                setMessage("");
                setDescription("");
            }, [2000])

            savedRecipesID();
            getRecipes();
        }
        catch (err) {
            setMessage("Error!");
            setDescription('Something went wrong!');
            setOpen(true);
            setTimeout(() => {
                setOpen(false)
                setMessage("");
                setDescription("");
            }, [2000])
        }
    }

    useEffect(() => {
        getRecipes();
        savedRecipesID();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Box sx={{ width: '250px' }}>
                <TextField
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    type="text"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={{ ml: "auto" }}>
                                <IconButton
                                    aria-label="search"
                                    edge="end"
                                    sx={{ color: "#B3B6B7", ml: "auto" }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </Box>
            <br />

            <Grid container spacing={3}>
                {loading ?
                    <>
                        {Array.from(Array(4).keys().map((v, i) => {
                            return (
                                <Grid key={i} item lg={3} md={6} sm={12} xs={12}>
                                    <SkeletonCard />
                                </Grid>
                            )
                        }))}
                    </> :
                    <>
                        {recipes?.filter((v) => !keyword ?
                            v :
                            v.name.toLowerCase().includes(keyword.toLowerCase())).map((v) => {
                                return (
                                    <Grid item lg={3} md={6} sm={12} xs={12} key={v._id}>
                                        <Recipe
                                            v={v}
                                            ids={ids}
                                            userInfo={userInfo}
                                            saveRecipe={saveRecipe}
                                        />
                                    </Grid>
                                )
                            })}
                    </>
                }
            </Grid>

            <Dialog
                open={open}
                aria-labelledby="responsive-dialog-title"
                sx={{ textAlign: 'center' }}
            >
                <DialogTitle
                    id="responsive-dialog-title"
                    sx={{ mb: 0, pb: 0 }}
                >
                    <Typography variant='h5'>
                        {message}
                    </Typography>
                </DialogTitle>

                <DialogTitle id="responsive-dialog-title">
                    {message?.includes("wait") ?
                        <CircularProgress color="success" /> :
                        message?.includes("Success") ?
                            <img
                                src={success}
                                height={'40px'}
                                weight={'40px'}
                                alt=''
                            /> :
                            message?.includes("Error") ?
                                <img
                                    src={error}
                                    height={'40px'}
                                    weight={'40px'}
                                    alt=''
                                /> :
                                null
                    }
                </DialogTitle>

                <DialogContent
                    sx={Smalldialog ?
                        { minWidth: '100px' } :
                        { minWidth: '320px' }
                    }
                >
                    <DialogContentText>
                        <Typography variant='body1'>
                            {description}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Home
