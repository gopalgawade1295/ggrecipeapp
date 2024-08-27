import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Grid,
    Toolbar,
    Avatar,
    IconButton,
    Typography,
    TextField,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Dialog,
    useMediaQuery,
    useTheme,
    CircularProgress,
    Skeleton,
} from "@mui/material";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
import {
    Button1,
    Button3,
    Button4,
    FlexStart,
    Heading,
    SubTitle,
    Title,
} from "../assets/styles/CommonStyles";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import {
    RecipeImgBox,
    RecipeIngredientsBox,
} from "../assets/styles/MyRecipeStyles";
import { modeContext } from "../App";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { grey } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Select from "react-select";
import { recipes } from "../components/Categories";

const MyRecipes = () => {
    const [data, setData] = useState({
        _id: "",
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: "",
        category: "",
        userOwner: "",
        __v: "",
    });
    const [load, setLoad] = useState(false);
    const mode = useContext(modeContext);
    const params = useParams();

    const getRecipe = async () => {
        setLoad(true);
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SECRET_KEY}/recipes/recipe/${params.id}`
            );
            const data = await res.data;

            setData({
                _id: data.data._id,
                name: data.data.name,
                ingredients: data.data.ingredients,
                instructions: data.data.instructions,
                imageUrl: data.data.imageUrl,
                cookingTime: data.data.cookingTime,
                category: data.data.category,
                userOwner: data.data.userOwner,
                __v: data.data.__v,
            });
            setLoad(false);
        } catch (err) {
            console.log(err);
            setLoad(false);
        }
    };

    useEffect(() => {
        getRecipe();
    }, [params.id]);

    const [openmodal, setOpenModal] = useState(false);
    const [key, setKey] = useState("add");
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [ID, setID] = useState("");
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        cookingtime: "Recipe",
        category: "",
        ingredients: "",
        instructions: "",
    });
    const matches = useMediaQuery("(min-width:600px)");
    const outerTheme = useTheme();
    const Smalldialog = useMediaQuery(outerTheme.breakpoints.down("sm"));

    const handleClose = () => {
        setOpen(false);
        setRecipe({
            name: "",
            description: "",
            cookingtime: "",
            category: "",
            ingredients: "",
            instructions: "",
        });
        setID("");
        setImage("");
        setKey("add");
    };

    const scroll = "paper";
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const ImageConvert = (e) => {
        if (e) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(e);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
                fileReader.onerror = (err) => {
                    reject(err);
                };
            });
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const newimg = await ImageConvert(file);
        setImage(newimg);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            color: mode.mode === "dark" ? "#FFFFFF" : "#000000",
            backgroundColor: mode.mode === "dark" ? "rgba(0, 0, 0, 0.04)" : "#FFFFFF",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: mode.mode === "dark" ? "#FFFFFF" : "#000000",
        }),
        option: (base, { isFocused }) => {
            return {
                ...base,
                backgroundColor: isFocused ? "#E4EBE4" : "#FFFFFF",
                color: "#000000",
            };
        },
    };

    const UpdateRecipe = async () => {
        if (Object.values(recipe).some((x) => x === "") || image === "") {
            setMessage("Error!");
            setDescription("Please fill all fields");
            setOpenModal(true);

            setTimeout(() => {
                setOpenModal(false);
                setMessage("");
                setDescription("");
            }, [2000]);
        } else {
            setMessage("Please wait!");
            setDescription("Please do not close the window or go back");
            setOpenModal(true);

            try {
                await axios.put(
                    `${process.env.REACT_APP_SECRET_KEY}/recipes/update/${ID}`,
                    {
                        name: recipe.name,
                        description: recipe.name,
                        ingredients: recipe.ingredients.split(","),
                        instructions: recipe.instructions,
                        imageUrl: String(image),
                        cookingTime: recipe.cookingtime,
                        category: recipe.category,
                        userOwner: userInfo.userID,
                        _id: ID,
                    },
                    {
                        headers: { Authorization: userInfo.token },
                    }
                );

                setTimeout(() => {
                    setOpenModal(false);
                    setMessage("");
                    setDescription("");
                }, [2000]);

                setMessage("Success!");
                setDescription("Updated Successfully.");
                setOpenModal(true);
                setID("");
                setRecipe({
                    name: "",
                    description: "",
                    cookingtime: "",
                    ingredients: "",
                    instructions: "",
                    category: "",
                });
                setImage("");
                setKey("add");
                setTimeout(() => {
                    setOpenModal(false);
                    setMessage("");
                    setDescription("");
                }, [2000]);
                getRecipe();
                setOpen(false);
            } catch (err) {
                console.log(err);
                setMessage("Error!");
                setDescription("Something went wrong!");
                setOpenModal(true);

                setTimeout(() => {
                    setOpenModal(false);
                    setMessage("");
                    setDescription("");
                }, [2000]);
            }
        }
    };

    const DeleteRecipe = async (id) => {
        setMessage("Please wait!");
        setDescription("Please do not close the window or go back");
        setOpenModal(true);

        try {
            await axios.delete(`${process.env.REACT_APP_SECRET_KEY}/recipes/${id}`, {
                headers: { Authorization: userInfo.token },
            });

            setTimeout(() => {
                setOpenModal(false);
                setMessage("");
                setDescription("");
            }, [2000]);

            setMessage("Success!");
            setDescription("Deleted Successfully.");
            setOpenModal(true);
            setID("");
            setTimeout(() => {
                setOpenModal(false);
                setMessage("");
                setDescription("");
            }, [2000]);
            navigate("/myrecipelist");
        } catch (err) {
            setMessage("Error!");
            setDescription("Something went wrong!");
            setOpenModal(true);

            setTimeout(() => {
                setOpenModal(false);
                setMessage("");
                setDescription("");
            }, [2000]);
        }
    };

    return (
        <div>
            <Box sx={{ backgroundColor: "background.default", color: "text.primary" }}>
                <Toolbar />

                <Title variant="h4">
                    {load ? <Skeleton animation="wave" width={"100px"} /> : "Recipe"}
                </Title>

                <Box sx={{ mb: 6 }}>
                    {load ? (
                        <Box sx={{ width: "100%", textAlign: "left" }}>
                            <Grid container spacing={4}>
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <SubTitle variant="h5">
                                        <Skeleton animation="wave" width={"160px"} />
                                    </SubTitle>

                                    <Skeleton
                                        variant="rectangular"
                                        animation="wave"
                                        width={"100%"}
                                        height={"350px"}
                                        sx={{ mb: 0.5 }}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <Heading variant="h6">
                                        <Skeleton
                                            animation="wave"
                                            width={"150px"}
                                        />
                                    </Heading>

                                    <RecipeIngredientsBox
                                        sx={{
                                            backgroundColor: mode.mode === "dark" ? "#484848" : "#E4EBE4",
                                            color: "text.secondary",
                                        }}
                                    >
                                        <ul style={{ listStyleType: "none" }}>
                                            {Array.from(Array(9).fill()).map((v, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{ lineHeight: 1.8 }}
                                                        >
                                                            <Skeleton
                                                                animation="wave"
                                                                width={i % 2 === 0 ? "120px" : "150px"}
                                                            />
                                                        </Typography>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </RecipeIngredientsBox>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <FlexStart>
                                        <Skeleton
                                            animation="wave"
                                            variant="circular"
                                            width={24}
                                            height={24}
                                            sx={{ background: "#D6BC86", mr: 1 }}
                                        />

                                        <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                            <Skeleton animation="wave" width={"50px"} />
                                        </Typography>
                                    </FlexStart>
                                    <br />

                                    <Heading variant="h6">
                                        <Skeleton
                                            animation="wave"
                                            width={"160px"}
                                        />
                                    </Heading>

                                    {Array.from(Array(10).keys()).map((v, i) => {
                                        return (
                                            <Typography
                                                variant="body1"
                                                key={i}
                                                sx={{ lineHeight: 1.8, color: "text.secondary" }}
                                            >
                                                <Skeleton
                                                    animation="wave"
                                                    width={i % 2 === 0 ? "90%" : "80%"}
                                                />
                                            </Typography>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </Box>
                    ) : (
                        <Box sx={{ width: "100%", textAlign: "left" }}>
                            <Grid container spacing={4}>
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <SubTitle variant="h5">
                                        {data.name}
                                    </SubTitle>

                                    <RecipeImgBox>
                                        <img
                                            src={data.imageUrl}
                                            height={"100%"}
                                            width={"100%"}
                                            alt=""
                                        />
                                    </RecipeImgBox>
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <Heading variant="h6">
                                        Ingredients
                                    </Heading>

                                    <RecipeIngredientsBox
                                        sx={{
                                            backgroundColor: mode.mode === "dark" ? "#484848" : "#E4EBE4",
                                            color: "text.secondary",
                                        }}
                                    >
                                        <ul>
                                            {data.ingredients.map((v, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{ lineHeight: 1.8 }}
                                                        >
                                                            {v}
                                                        </Typography>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </RecipeIngredientsBox>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <FlexStart>
                                        <Avatar sx={{ bgcolor: "#D6BC86", width: 24, height: 24, mr: 1 }}>
                                            <AccessTimeFilledIcon />
                                        </Avatar>

                                        <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                                            {data.cookingTime} Min.
                                        </Typography>

                                        {data?.userOwner === userInfo?.userID ? (
                                            <>
                                                <Button4
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setRecipe({
                                                            ...recipe,
                                                            name: data.name,
                                                            description: data.description,
                                                            cookingtime: data.cookingTime,
                                                            category: data.category,
                                                            ingredients: data.ingredients.toString(),
                                                            instructions: data.instructions,
                                                        });
                                                        setKey("update");
                                                        setID(data._id);
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </Button4>

                                                <Button4 onClick={() => DeleteRecipe(data._id)}>
                                                    <DeleteOutlineIcon fontSize="small" />
                                                </Button4>
                                            </>
                                        ) : null}
                                    </FlexStart>
                                    <br />

                                    <Heading variant="h6">
                                        Instructions
                                    </Heading>

                                    <ul>
                                        {data.instructions
                                            ?.split(".")
                                            .filter((v) => /\w+/.test(v))
                                            .map((v, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{ lineHeight: 1.8, color: "text.secondary" }}
                                                        >
                                                            {v}.
                                                        </Typography>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                style={{ overflow: "hidden" }}
                maxWidth={"md"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                    id="scroll-dialog-title"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">
                        {key === "add" ? "Add" : "Update"} Recipe
                    </Typography>

                    <IconButton sx={{ p: 0, m: 0 }} onClick={() => handleClose()}>
                        <CancelIcon sx={{ color: grey[400] }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box
                            sx={
                                matches
                                    ? {
                                        height: "450px",
                                        width: "500px",
                                        overflowX: "hidden",
                                        p: 1,
                                    }
                                    : {
                                        width: "100%",
                                        height: "450px",
                                        overflowX: "hidden",
                                        p: 1,
                                    }
                            }
                        >
                            <Box sx={{ width: "100%", mb: 0.5, mr: 0.5 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 0.5, fontWeight: 450 }}
                                >
                                    Recipe Name<span style={{ color: "red" }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="text"
                                    placeholder="Enter Recipe Name"
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setRecipe({ ...recipe, name: e.target.value })
                                    }
                                    value={recipe.name}
                                />
                            </Box>

                            <Box sx={{ width: "100%", mb: 0.5 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 0.5, fontWeight: 450 }}
                                >
                                    Cooking Time in minutes<span style={{ color: "red" }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="number"
                                    placeholder="Enter Cooking Time"
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setRecipe({ ...recipe, cookingtime: e.target.value })
                                    }
                                    value={recipe.cookingtime}
                                />
                            </Box>

                            <Box sx={{ width: "100%", mb: 0.5 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 0.5, fontWeight: 450 }}
                                >
                                    Category<span style={{ color: "red" }}>*</span>
                                </Typography>

                                <Select
                                    placeholder="Select Category"
                                    defaultValue={recipe.category}
                                    isClearable={true}
                                    onChange={(e) => {
                                        setRecipe({ ...recipe, category: e ? e.value : "" });
                                    }}
                                    options={recipes.map((v) => ({
                                        value: v.category,
                                        label: v.category,
                                    }))}
                                    styles={customStyles}
                                />
                            </Box>

                            <Box sx={{ width: "100%", mb: 0.5 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 0.5, fontWeight: 450 }}
                                >
                                    Instructions<span style={{ color: "red" }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="text"
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={3}
                                    placeholder="Enter Instructions"
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setRecipe({ ...recipe, instructions: e.target.value })
                                    }
                                    value={recipe.instructions}
                                />
                            </Box>

                            <Box sx={{ width: "100%", mb: 0.5 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 0.5, fontWeight: 450 }}
                                >
                                    Ingredients<span style={{ color: "red" }}>*</span>
                                </Typography>

                                <TextField
                                    size="small"
                                    fullWidth
                                    type="text"
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={3}
                                    placeholder="Enter Ingredients and Ingredients should separated by comma (,)"
                                    sx={{
                                        //maxWidth: '350px',
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setRecipe({ ...recipe, ingredients: e.target.value })
                                    }
                                    value={recipe.ingredients}
                                />
                            </Box>

                            <Box sx={{ width: "100%", mb: 0.5 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 0.5, fontWeight: 450 }}
                                >
                                    Image<span style={{ color: "red" }}>*</span>
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
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) => handleUpload(e)}
                                    value={recipe.image}
                                />
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ pr: 3 }}>
                    <Button3 onClick={() => handleClose()}>
                        Close
                    </Button3>

                    <Button1 onClick={() => UpdateRecipe()}>
                        Save
                    </Button1>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openmodal}
                aria-labelledby="responsive-dialog-title"
                sx={{ textAlign: "center" }}
            >
                <DialogTitle id="responsive-dialog-title" sx={{ mb: 0, pb: 0 }}>
                    <Typography variant="h5">
                        {message}
                    </Typography>
                </DialogTitle>

                <DialogTitle id="responsive-dialog-title">
                    {message?.includes("wait") ? (
                        <CircularProgress color="success" />
                    ) : message?.includes("Success") ? (
                        <img
                            src={success}
                            height={"40px"}
                            weight={"40px"}
                            alt=""
                        />
                    ) : message?.includes("Error") ? (
                        <img
                            src={error}
                            height={"40px"}
                            weight={"40px"}
                            alt=""
                        />
                    ) : null}
                </DialogTitle>

                <DialogContent sx={Smalldialog ? { minWidth: "100px" } : { minWidth: "320px" }}>
                    <DialogContentText>
                        <Typography variant="body1">
                            {description}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyRecipes;
