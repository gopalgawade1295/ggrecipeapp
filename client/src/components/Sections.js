import React, { useContext, useEffect, useRef, useState } from "react";
import {
    SectionBox1,
    SectionBox2,
    SectionBox3,
} from "../assets/styles/SectionsStyles";
import { Button1, Button3 } from "../assets/styles/CommonStyles";
import burger from "../assets/images/burgers-575655_1280.png";
import salad from "../assets/images/salad-575436_1280.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { grey } from "@mui/material/colors";
import {
    Box,
    Grid,
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
} from "@mui/material";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { recipes } from "./Categories";
import { modeContext } from "../App";
import Select from "react-select";

const Sections = () => {
    const navigate = useNavigate();
    const mode = useContext(modeContext);
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const [openmodal, setOpenModal] = useState(false);
    const [key, setKey] = useState("add");
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");

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

    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        cookingtime: "",
        category: "",
        ingredients: "",
        instructions: "",
    });
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
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
        setImage("");
        setKey("add");
    };

    const scroll = "paper";

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

    const UploadRecipe = async () => {
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
                await axios.post(
                    `${process.env.REACT_APP_SECRET_KEY}/recipes`,
                    {
                        name: recipe.name,
                        description: recipe.name,
                        ingredients: recipe.ingredients.split(","),
                        instructions: recipe.instructions,
                        imageUrl: String(image),
                        cookingTime: recipe.cookingtime,
                        category: recipe.category,
                        userOwner: userInfo.userID,
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
                setDescription("Created Successfully.");
                setOpenModal(true);

                setRecipe({
                    name: "",
                    description: "",
                    cookingtime: "",
                    category: "",
                    ingredients: "",
                    instructions: "",
                });
                setImage("");
                setKey("add");
                setTimeout(() => {
                    setOpenModal(false);
                    setMessage("");
                    setDescription("");
                }, [2000]);
                mode.fetchData();
                setOpen(false);
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
        }
    };

    return (
        <div>
            <Grid container spacing={2} sx={{ mb: 6 }}>
                {userInfo === null ? (
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <SectionBox1>
                            <Typography variant="h3" sx={{ fontWeight: 500 }}>
                                Your Daily Dish
                            </Typography>

                            <Typography variant="h3" sx={{ fontWeight: 500, mb: 2 }}>
                                A <span style={{ color: "#FE794C" }}>Food</span> Journey
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{ color: "text.secondary", mb: 2 }}
                            >
                                Welcome to GG Recipes, your one-stop destination for
                                mouth-watering recipes that will tantalize your taste buds! Our
                                website is a treasure trove of culinary delights, featuring a
                                vast collection of recipes that cater to diverse tastes and
                                dietary preferences. From comforting classics to innovative
                                twists, our recipes are carefully crafted to ensure that every
                                dish that leaves your kitchen is a masterpiece.
                            </Typography>

                            <Button1 onClick={() => navigate("/register")}>
                                <Typography variant="body1">
                                    Sign up
                                </Typography>
                            </Button1>

                            <Typography
                                variant="body1"
                                sx={{ color: "text.secondary", mt: 2 }}
                            >
                                Do you have an account?{" "}
                                <span
                                    className="span-section"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </span>
                            </Typography>
                        </SectionBox1>
                    </Grid>
                ) : null}

                {userInfo === null ?
                    (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <SectionBox2 sx={{ minHeight: "400px" }}>
                                <img
                                    src={burger}
                                    alt=""
                                    height={"200px"}
                                    width={"auto"}
                                />

                                <Typography variant="caption" sx={{ color: "#FE794C", mt: 2 }}>
                                    Image by{" "}
                                    <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=575436">
                                        OpenClipart-Vectors
                                    </a>{" "}
                                    from{" "}
                                    <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=575436">
                                        Pixabay
                                    </a>
                                </Typography>
                            </SectionBox2>
                        </Grid>
                    ) :
                    null
                }

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <SectionBox2 sx={{ minHeight: userInfo !== null ? "280px" : "400px" }}>
                        <img
                            src={salad}
                            alt=""
                            height={"200px"}
                            width={"auto"}
                        />

                        <Typography variant="caption" sx={{ color: "#FE794C", mt: 2 }}>
                            Image by{" "}
                            <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=575436">
                                OpenClipart-Vectors
                            </a>{" "}
                            from{" "}
                            <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=575436">
                                Pixabay
                            </a>
                        </Typography>
                    </SectionBox2>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <SectionBox3 sx={{ minHeight: userInfo !== null ? "280px" : "400px" }}>
                        <Typography variant="h4" sx={{ fontWeight: 500, mb: 2 }}>
                            Share Your Recipes
                        </Typography>

                        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                            Share your recipes on our website and become a part of our vibrant
                            community of home cooks and food enthusiasts! Whether you're a
                            seasoned chef or a culinary newbie, we want to hear from you. Our
                            platform is the perfect place to showcase your creations. Plus,
                            who knows - your dish might just become the next big thing! So go
                            ahead, submit your recipe today and let's get cooking!
                        </Typography>

                        <Button1 onClick={() => userInfo === null ? navigate("/login") : setOpen(true)}>
                            <Typography variant="body1">
                                Create a new Recipe
                            </Typography>
                        </Button1>
                    </SectionBox3>
                </Grid>
            </Grid>

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

                    <IconButton
                        sx={{ p: 0, m: 0 }}
                        onClick={() => handleClose()}
                    >
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
                                matches ?
                                    {
                                        height: "450px",
                                        width: "500px",
                                        overflowX: "hidden",
                                        p: 1,
                                    } :
                                    {
                                        width: "100%",
                                        height: "450px",
                                        overflowX: "hidden",
                                        p: 1,
                                    }
                            }
                        >
                            <Box sx={{ width: "100%", mb: 0.5 }}>
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
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) =>
                                        setRecipe({
                                            ...recipe,
                                            name: e.target.value,
                                            description: e.target.value,
                                        })
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
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) => setRecipe({ ...recipe, cookingtime: e.target.value })}
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
                                    onChange={(e) => { setRecipe({ ...recipe, category: e ? e.value : "" }) }}
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
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
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
                                        "& input::placeholder": { fontSize: "14px" },
                                        "& .MuiInputBase-root": {
                                            fontSize: "14px",
                                        },
                                    }}
                                    onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
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

                    <Button1 onClick={() => UploadRecipe()}>
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
                        <Typography variant="body1">{description}</Typography>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Sections;
