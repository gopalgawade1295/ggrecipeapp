import { Box, Chip, Grid, IconButton, Skeleton, Typography, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { RecipeSaveButton, RecipeTileBox } from '../assets/styles/Styles'
import axios from 'axios'
import img1 from '../assets/images/paneer-tikka-skewers-500x500.jpg'
import SearchIcon from '@mui/icons-material/Search'

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState('');

    const getRecipes = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://ggrecipeapp.onrender.com/recipes');
            const data = await res.data;
            setRecipes(data);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        getRecipes();
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
                                    <RecipeTileBox>
                                        <Box textAlign={'center'}>
                                            <Typography component="div" variant='h5' sx={{ p: 1, width: '150px', ml: 'auto', mr: 'auto' }}>
                                                <Skeleton animation="wave" />
                                            </Typography>
                                        </Box>

                                        <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />

                                        <Typography component="div" variant='h6' sx={{ p: 1, pb: 0, width: '150px', ml: 2 }}>
                                            <Skeleton animation="wave" />
                                        </Typography>

                                        <Box sx={{ m: 1.75, minHeight: '110px', }}>
                                            {Array.from(Array(3).keys().map((v, i) => {
                                                return (
                                                    <Skeleton key={i} variant="rounded" animation="wave" width={i === 0 ? 210 : i === 1 ? 250 : 110} height={30} sx={{ borderRadius: "20px", m: 0.75 }} />
                                                )
                                            }))}
                                        </Box>

                                        <Typography component="div" variant='h6' sx={{ p: 1, pb: 0, width: '150px', ml: 2 }}>
                                            <Skeleton animation="wave" />
                                        </Typography>

                                        <Box sx={{ height: '180px', m: 1, p: 1, pt: 0 }}>
                                            <Typography component="div" variant='body2' sx={{ p: 1 }}>
                                                {Array.from(Array(5).keys().map((v, i) => {
                                                    return (
                                                        <Skeleton animation="wave" key={i} />
                                                    )
                                                }))}
                                                <Skeleton animation="wave" width={120} />
                                            </Typography>
                                        </Box>
                                    </RecipeTileBox>
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
                                        <RecipeTileBox>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Typography variant='h5' sx={{ p: 1 }}>
                                                    {v.name}
                                                </Typography>

                                                <RecipeSaveButton>
                                                    <Typography variant='body2' sx={{ color: 'text.primary' }}>
                                                        Save
                                                    </Typography>
                                                </RecipeSaveButton>
                                            </Box>

                                            <img
                                                src={img1}
                                                style={{ height: '250px', width: '100%' }}
                                                alt={v.name}
                                            />

                                            <Typography variant='h6' sx={{ p: 1, pb: 0, ml: 1 }}>
                                                Ingredients
                                            </Typography>

                                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', m: 1.5, height: '110px', overflow: 'auto' }}>
                                                {v.ingredients?.map((v, i) => {
                                                    return (
                                                        <Chip label={v} variant="outlined" key={i} sx={{ m: 0.25 }} />
                                                    )
                                                })}
                                            </Box>

                                            <Typography variant='h6' sx={{ p: 1, pb: 0, ml: 1 }}>
                                                Instructions
                                            </Typography>

                                            <Box sx={{ height: '180px', overflow: 'auto', m: 1, p: 1, pt: 0 }}>
                                                <Typography variant='body2' sx={{ p: 1, color: 'text.secondary' }}>
                                                    {v.instructions}
                                                </Typography>
                                            </Box>
                                        </RecipeTileBox>
                                    </Grid>
                                )
                            })}
                    </>
                }
            </Grid>
        </div>
    )
}

export default Home
