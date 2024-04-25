import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Recipe from '../components/Recipe';
import SkeletonCard from '../components/SkeletonCard';

const SavedRecipes = () => {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [ids, setIds] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

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

    const getRecipes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}/recipes/savedRecipes/${userInfo.userID}`,
                {
                    userOwner: userInfo.userID
                });
            const data = await res.data;
            setRecipes(data?.data);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setLoading(false);
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
                                        <Recipe v={v} ids={ids} userInfo={userInfo} />
                                    </Grid>
                                )
                            })}
                    </>
                }
            </Grid>
        </div>
    )
}

export default SavedRecipes
