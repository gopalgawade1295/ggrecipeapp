import React, { useEffect, useRef, useState } from 'react';
import { ButtonBack, ButtonProduct, FlexBetween, FlexBetweenWrap, FlexEnd, RecipeHeading, RecipeTileBox } from '../assets/styles/Styles';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import SkeletonCard from '../components/SkeletonCard';
import { Box, Chip, Grid, IconButton, Typography, InputAdornment, TextField, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import success from '../assets/images/success.png';
import error from '../assets/images/error.png';

const MyRecipes = () => {
    const [openmodal, setOpenModal] = useState(false);
    const [key, setKey] = useState('add');
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [ID, setID] = useState('')
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        cookingtime: '',
        ingredients: '',
        instructions: ''
    })
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const matches = useMediaQuery('(min-width:600px)');
    const outerTheme = useTheme();
    const Smalldialog = useMediaQuery(outerTheme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
        setRecipe({
            name: '',
            description: '',
            cookingtime: '',
            ingredients: '',
            instructions: ''
        });
        setID('')
        setImage('');
        setKey('add');
    }

    const scroll = "paper"

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const getRecipes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}/recipes`);
            const data = await res.data;
            setRecipes(data?.filter(v => v.userOwner === userInfo.userID).map(v => v));
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

    const ImageConvert = (e) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (err) => {
                reject(err);
            }
        })
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const newimg = await ImageConvert(file);
        setImage(newimg)
    }

    const UploadRecipe = async () => {
        if (!Object.values(recipe).some(v => v) || image === '') {
            setMessage("Error!");
            setDescription("Please fill all fields");
            setOpenModal(true);

            setTimeout(() => {
                setOpenModal(false)
                setMessage("");
                setDescription("");
            }, [2000])
        }
        else {
            setMessage("Please wait!");
            setDescription("Please do not close the window or go back");
            setOpenModal(true);

            try {
                setLoading(true);
                await axios.post(`${process.env.REACT_APP_SECRET_KEY}/recipes`,
                    {
                        name: recipe.name,
                        description: recipe.name,
                        ingredients: [recipe.ingredients],
                        instructions: recipe.instructions,
                        imageUrl: String(image),
                        cookingTime: recipe.cookingtime,
                        userOwner: userInfo.userID,
                    },
                    {
                        headers: { "Authorization": userInfo.token }
                    }
                );

                setTimeout(() => {
                    setOpenModal(false)
                    setMessage("");
                    setDescription("");
                }, [2000])

                setMessage("Success!");
                setDescription("Created Successfully.");
                setOpenModal(true);

                setRecipe({
                    name: '',
                    description: '',
                    cookingtime: '',
                    ingredients: '',
                    instructions: ''
                });
                setImage('');
                setKey('add');
                setID('')
                setTimeout(() => {
                    setOpenModal(false);
                    setMessage("");
                    setDescription("");
                }, [2000])
                getRecipes();
            }
            catch (err) {
                setMessage("Error!");
                setDescription('Something went wrong!');
                setOpenModal(true);

                setTimeout(() => {
                    setOpenModal(false)
                    setMessage("");
                    setDescription("");
                }, [2000])
            }
        }
    }

    const UpdateRecipe = async () => {
        if (!Object.values(recipe).some(v => v) || image === '') {
            setMessage("Error!");
            setDescription("Please fill all fields");
            setOpenModal(true);

            setTimeout(() => {
                setOpenModal(false)
                setMessage("");
                setDescription("");
            }, [2000])
        }
        else {
            setMessage("Please wait!");
            setDescription("Please do not close the window or go back");
            setOpenModal(true);

            try {
                setLoading(true);
                await axios.put(`${process.env.REACT_APP_SECRET_KEY}/recipes/update/${ID}`,
                    {
                        name: recipe.name,
                        description: recipe.name,
                        ingredients: [...recipe.ingredients],
                        instructions: recipe.instructions,
                        imageUrl: String(image),
                        cookingTime: recipe.cookingtime,
                        userOwner: userInfo.userID,
                        _id: ID
                    },
                    {
                        headers: { "Authorization": userInfo.token }
                    }
                );

                setTimeout(() => {
                    setOpenModal(false)
                    setMessage("");
                    setDescription("");
                }, [2000])

                setMessage("Success!");
                setDescription("Updated Successfully.");
                setOpenModal(true);
                setID('')
                setRecipe({
                    name: '',
                    description: '',
                    cookingtime: '',
                    ingredients: '',
                    instructions: ''
                });
                setImage('');
                setKey('add');
                setTimeout(() => {
                    setOpenModal(false);
                    setMessage("");
                    setDescription("");
                }, [2000])
                getRecipes();
            }
            catch (err) {
                setMessage("Error!");
                setDescription('Something went wrong!');
                setOpenModal(true);

                setTimeout(() => {
                    setOpenModal(false)
                    setMessage("");
                    setDescription("");
                }, [2000])
            }
        }
    }

    const DeleteRecipe = async (id) => {
        setMessage("Please wait!");
        setDescription("Please do not close the window or go back");
        setOpenModal(true);

        try {
            setLoading(true);
            await axios.delete(`${process.env.REACT_APP_SECRET_KEY}/recipes/${id}`,
                {
                    headers: { "Authorization": userInfo.token }
                }
            );

            setTimeout(() => {
                setOpenModal(false)
                setMessage("");
                setDescription("");
            }, [2000])

            setMessage("Success!");
            setDescription("Deleted Successfully.");
            setOpenModal(true);
            setID('')
            setTimeout(() => {
                setOpenModal(false);
                setMessage("");
                setDescription("");
            }, [2000])
            getRecipes();
        }
        catch (err) {
            setMessage("Error!");
            setDescription('Something went wrong!');
            setOpenModal(true);

            setTimeout(() => {
                setOpenModal(false)
                setMessage("");
                setDescription("");
            }, [2000])
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <FlexBetweenWrap>
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

                <Typography variant='h5' sx={{ p: 1 }}>
                    Hello! {userInfo?.firstname} {userInfo?.lastname}
                </Typography>

                <ButtonProduct onClick={() => { setOpen(true); setKey('add') }}>
                    Add Recipe
                </ButtonProduct>
            </FlexBetweenWrap>
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
                                        <RecipeTileBox>
                                            <FlexBetween>
                                                <Typography variant='h5' sx={{ p: 1 }}>
                                                    {v.name}
                                                </Typography>
                                            </FlexBetween>

                                            <img
                                                src={v.imageUrl}
                                                style={{ height: '250px', width: '100%' }}
                                                alt={v.name}
                                            />

                                            <RecipeHeading variant='h6'>
                                                Ingredients
                                            </RecipeHeading>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-start',
                                                    flexWrap: 'wrap',
                                                    m: 1.5,
                                                    height: '110px',
                                                    overflow: 'auto'
                                                }}
                                            >
                                                {v.ingredients?.map((v, i) => {
                                                    return (
                                                        <Chip label={v} variant="outlined" key={i} sx={{ m: 0.25 }} />
                                                    )
                                                })}
                                            </Box>

                                            <RecipeHeading variant='h6'>
                                                Instructions
                                            </RecipeHeading>

                                            <Box
                                                sx={{
                                                    height: '180px',
                                                    overflow: 'auto',
                                                    m: 1,
                                                    p: 1,
                                                    pt: 0
                                                }}
                                            >
                                                <Typography variant='body2' sx={{ p: 1, color: 'text.secondary' }}>
                                                    {v.instructions}
                                                </Typography>
                                            </Box>

                                            <FlexEnd>
                                                <ButtonBack onClick={() => DeleteRecipe(v._id)}>
                                                    Delete
                                                </ButtonBack>

                                                <ButtonProduct onClick={() => {
                                                    setOpen(true);
                                                    setRecipe({
                                                        ...recipe,
                                                        name: v.name,
                                                        description: v.description,
                                                        cookingtime: v.cookingTime,
                                                        ingredients: v.ingredients,
                                                        instructions: v.instructions
                                                    });
                                                    setKey('update');
                                                    setID(v._id)
                                                }}>
                                                    Edit
                                                </ButtonProduct>
                                            </FlexEnd>
                                        </RecipeTileBox>
                                    </Grid>
                                )
                            })}
                    </>
                }
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                style={{ overflow: 'hidden' }}
                maxWidth={'md'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6'>
                        {key === 'add' ? "Add" : "Update"} Recipe
                    </Typography>

                    <IconButton sx={{ p: 0, m: 0 }} onClick={() => handleClose()}>
                        <CancelIcon sx={{ color: grey[400] }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box sx={matches ?
                            { width: '100%', height: '450px', width: '500px', overflow: 'auto' } :
                            { width: '100%', height: '450px', overflow: 'auto' }
                        }>
                            <Box sx={{ width: '100%', mb: 0.5 }}>
                                <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                    Recipe Name<span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="text"
                                    placeholder='Enter Recipe Name'
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px"
                                        }
                                    }}
                                    onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
                                    value={recipe.name}
                                />
                            </Box>

                            <Box sx={{ width: '100%', mb: 0.5 }}>
                                <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                    Cooking Time in minutes<span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="number"
                                    placeholder='Enter Cooking Time'
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px"
                                        }
                                    }}
                                    onChange={(e) => setRecipe({ ...recipe, cookingtime: e.target.value })}
                                    value={recipe.cookingtime}
                                />
                            </Box>

                            <Box sx={{ width: '100%', mb: 0.5 }}>
                                <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                    Instructions<span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="text"
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={3}
                                    placeholder='Enter Instructions'
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px"
                                        }
                                    }}
                                    onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
                                    value={recipe.instructions}
                                />
                            </Box>

                            <Box sx={{ width: '100%', mb: 0.5 }}>
                                <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                    Ingredients<span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="text"
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={3}
                                    placeholder='Enter Ingredients and Ingredients should separated by comma (,)'
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px"
                                        }
                                    }}
                                    onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
                                    value={recipe.ingredients}
                                />
                            </Box>

                            <Box sx={{ width: '100%', mb: 0.5 }}>
                                <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                    Image<span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="file"
                                    accept=".jpeg, .jpg, .png"
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px"
                                        }
                                    }}
                                    onChange={(e) => handleUpload(e)}
                                    value={recipe.image}
                                />
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ pr: 3 }}>
                    <ButtonBack onClick={() => handleClose()}>
                        Close
                    </ButtonBack>

                    <ButtonProduct onClick={() => key === 'add' ? UploadRecipe() : UpdateRecipe()}>
                        Save
                    </ButtonProduct>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openmodal}
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

export default MyRecipes
