import {
    Avatar,
    Grid,
    Toolbar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    CircularProgress,
    useMediaQuery,
    useTheme,
    Skeleton,
    Box,
    TextField,
} from "@mui/material";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
import empty from "../assets/images/paper-145941_640.png";
import React, { useContext, useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { modeContext } from "../App";
import { Title } from "../assets/styles/CommonStyles";
import {
    RecipeCard,
    RecipeCardContent,
    RecipeCardEmpty,
    RecipeSaveButton,
    RecipeTime,
} from "../assets/styles/RecipeStyles";
import { FlexBetween } from "../assets/styles/FooterStyles";
import { useLocation, useNavigate } from "react-router-dom";
import Sections from "./Sections";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Categories from "./Categories";

const Recipe = () => {
    const [ids, setIds] = useState([]);
    const [keyword, setKeyword] = useState("");
    const mode = useContext(modeContext);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const theme = useTheme();
    const Smalldialog = useMediaQuery(theme.breakpoints.down("sm"));
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = mode.data.filter((v) => !keyword ?
        v :
        v.name.toLowerCase().includes(keyword.toLowerCase())).slice(itemOffset, endOffset);

    const pageCount = Math.ceil(mode.data.filter((v) => !keyword ?
        v :
        v.name.toLowerCase().includes(keyword.toLowerCase())).length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % mode.data.filter((v) => !keyword ?
            v :
            v.name.toLowerCase().includes(keyword.toLowerCase())).length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        mode.fetchData();
        setKeyword("");
    }, [navigate, mode.category]);

    const savedRecipesID = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SECRET_KEY}/recipes/savedRecipes/ids/${userInfo.userID}`
            );
            const data = await res.data;
            setIds(data?.data);
        } catch (err) {
            console.log(err);
        }
    };

    const saveRecipe = async (key) => {
        setMessage("Please wait!");
        setDescription("Please do not close the window or go back");
        setOpen(true);
        try {
            setTimeout(() => {
                setOpen(false);
                setMessage("");
                setDescription("");
            }, [2000]);
            const res = await axios.put(
                `${process.env.REACT_APP_SECRET_KEY}/recipes`,
                {
                    userID: userInfo.userID,
                    recipeID: key,
                }
            );
            setMessage("Success!");
            setDescription("Saved Successfully.");
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
                setMessage("");
                setDescription("");
            }, [2000]);

            savedRecipesID();
            mode.fetchData();
        } catch (err) {
            setMessage("Error!");
            setDescription("Something went wrong!");
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                setMessage("");
                setDescription("");
            }, [2000]);
        }
    };

    useEffect(() => {
        savedRecipesID();
    }, []);

    return (
        <div>
            {location.pathname.includes("myrecipelist") ||
                location.pathname.includes("mysavedlist") ? (
                <>
                    <Toolbar />
                    <Sections />
                    <Categories />
                </>
            ) : null}

            <FlexBetween>
                <Title variant="h4">
                    {location.pathname.includes("myrecipelist")
                        ? "My"
                        : location.pathname.includes("mysavedlist")
                            ? "Saved"
                            : "Explore"}{" "}
                    Recipes
                </Title>

                <Box sx={{ mb: 1, width: '250px' }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Box>
            </FlexBetween>

            <Grid container spacing={4} sx={{ mb: 6 }}>
                {mode.loading ? (
                    <>
                        {Array.from(Array(4).keys()).map((v, i) => {
                            return (
                                <Grid item lg={3} md={4} sm={6} xs={12} key={i}>
                                    <RecipeCard
                                        sx={{
                                            backgroundColor: mode.mode === "dark" ? "#6EAEAE" : "#E4EBE4",
                                            cursor: "no-drop",
                                        }}
                                    >
                                        <RecipeCardContent>
                                            <Skeleton
                                                variant="rectangular"
                                                animation="wave"
                                                width={"100%"}
                                                height={"100%"}
                                            />
                                        </RecipeCardContent>

                                        <Typography variant="h6" sx={{ fontWeight: 600, p: 1 }}>
                                            <Skeleton animation="wave" width={"100%"} />
                                        </Typography>

                                        <RecipeTime>
                                            <Skeleton
                                                animation="wave"
                                                variant="circular"
                                                width={24}
                                                height={24}
                                                sx={{ background: "#D6BC86" }}
                                            />

                                            <Typography
                                                variant="body2"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                <Skeleton
                                                    animation="wave"
                                                    width={"120px"}
                                                />
                                            </Typography>
                                        </RecipeTime>
                                    </RecipeCard>
                                </Grid>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {!mode.loading && mode.data.filter((v) => !keyword ?
                            v :
                            v.name.toLowerCase().includes(keyword.toLowerCase()))?.length === 0 ? (
                            <Grid item xs={12}>
                                <RecipeCard>
                                    <RecipeCardEmpty>
                                        <img
                                            src={empty}
                                            height={"150px"}
                                            width={"150px"}
                                            alt=""
                                        />

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                p: 1,
                                                color: mode.mode === "dark" ? "text.secondary" : "#FE794C",
                                            }}
                                        >
                                            NO DATA
                                        </Typography>
                                    </RecipeCardEmpty>
                                </RecipeCard>
                            </Grid>
                        ) : (
                            <>
                                {location.pathname.includes("mysavedlist") ? (
                                    <>
                                        {currentItems.filter((v) => ids.includes(v._id))
                                            .map((v) => {
                                                return (
                                                    <Grid item lg={3} md={4} sm={6} xs={12} key={v._id}>
                                                        <RecipeCard
                                                            sx={{
                                                                backgroundColor: mode.mode === "dark" ? "#6EAEAE" : "#E4EBE4",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                userInfo === null
                                                                    ? navigate("/login")
                                                                    : navigate(`/myrecipes/${v._id}`)
                                                            }
                                                        >
                                                            <RecipeCardContent>
                                                                <img
                                                                    src={v.imageUrl}
                                                                    alt=""
                                                                    height={"100%"}
                                                                    width={"100%"}
                                                                />
                                                            </RecipeCardContent>

                                                            <Typography
                                                                variant="h6"
                                                                sx={{ fontWeight: 600, p: 1 }}
                                                            >
                                                                {v.name?.length > 18 ? `${v.name?.slice(0, 18)}...` : v.name}
                                                            </Typography>

                                                            <RecipeTime>
                                                                <Avatar
                                                                    sx={{
                                                                        bgcolor: "#D6BC86",
                                                                        width: 24,
                                                                        height: 24,
                                                                    }}
                                                                >
                                                                    <AccessTimeFilledIcon />
                                                                </Avatar>

                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{ color: "text.secondary" }}
                                                                >
                                                                    {v.cookingTime} Minutes
                                                                </Typography>
                                                            </RecipeTime>
                                                        </RecipeCard>
                                                    </Grid>
                                                );
                                            })}
                                    </>
                                ) : (
                                    <>
                                        {currentItems.map((v) => {
                                            return (
                                                <Grid item lg={3} md={4} sm={6} xs={12} key={v._id}>
                                                    <RecipeCard sx={{ backgroundColor: mode.mode === "dark" ? "#6EAEAE" : "#E4EBE4" }}>
                                                        <RecipeCardContent>
                                                            <img
                                                                src={v.imageUrl}
                                                                alt=""
                                                                height={"100%"}
                                                                width={"100%"}
                                                            />

                                                            {v.userOwner === userInfo?.userID ||
                                                                userInfo === null ?
                                                                null :
                                                                (
                                                                    <RecipeSaveButton
                                                                        sx={{
                                                                            cursor:
                                                                                v.userOwner === userInfo?.userID ||
                                                                                    userInfo === null
                                                                                    ? "no-drop"
                                                                                    : "pointer",
                                                                            color:
                                                                                ids?.includes(v._id) && userInfo !== null
                                                                                    ? "#6EAEAE"
                                                                                    : "#F4D73E",
                                                                        }}
                                                                        onClick={() =>
                                                                            ids?.includes(v._id)
                                                                                ? console.log("")
                                                                                : saveRecipe(v._id)
                                                                        }
                                                                    >
                                                                        {userInfo === null ?
                                                                            <BookmarkAddIcon /> :
                                                                            <>
                                                                                {ids?.includes(v._id) ?
                                                                                    <BookmarkAddedIcon /> :
                                                                                    <BookmarkAddIcon />
                                                                                }
                                                                            </>
                                                                        }
                                                                    </RecipeSaveButton>
                                                                )}
                                                        </RecipeCardContent>

                                                        <Typography
                                                            variant="h6"
                                                            sx={{ fontWeight: 600, p: 1, cursor: "pointer" }}
                                                            onClick={() =>
                                                                userInfo === null
                                                                    ? navigate("/login")
                                                                    : navigate(`/myrecipes/${v._id}`)
                                                            }
                                                        >
                                                            <u>{v.name?.length > 18 ? `${v.name?.slice(0, 18)}...` : v.name}</u>
                                                        </Typography>

                                                        <RecipeTime>
                                                            <Avatar
                                                                sx={{
                                                                    bgcolor: "#D6BC86",
                                                                    width: 24,
                                                                    height: 24,
                                                                }}
                                                            >
                                                                <AccessTimeFilledIcon />
                                                            </Avatar>

                                                            <Typography
                                                                variant="body2"
                                                                sx={{ color: "text.secondary" }}
                                                            >
                                                                {v.cookingTime} Minutes
                                                            </Typography>
                                                        </RecipeTime>
                                                    </RecipeCard>
                                                </Grid>
                                            );
                                        })}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                {mode.loading ?
                    null :
                    <Grid item xs={12}>
                        <div className="pagination-div">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                activeClassName={"item active "}
                                breakClassName={"item break-me "}
                                containerClassName={"pagination"}
                                disabledClassName={"disabled-page"}
                                marginPagesDisplayed={2}
                                nextClassName={"item next "}
                                pageClassName={"item pagination-page "}
                                previousClassName={"item previous"}
                            />
                        </div>
                    </Grid>
                }
            </Grid>

            <Dialog
                open={open}
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

export default Recipe;
