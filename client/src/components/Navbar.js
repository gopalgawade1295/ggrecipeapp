import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import logo from "../assets/images/recipe-book-icon.png";
import { Button2, FlexCenterMin } from "../assets/styles/CommonStyles";

const Navbar = ({ mode, setMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const Logout = () => {
        sessionStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "#FE794C",
                color: "#FFFFFF",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                pt: matches ? 0 : 1,
                pb: matches ? 0 : 1,
            }}
        >
            <Toolbar>
                <FlexCenterMin onClick={() => navigate("/")}>
                    {!matches ?
                        <img src={logo}
                            alt=""
                            height={"50px"}
                            width={"50px"}
                        /> :
                        null
                    }

                    <Typography
                        variant={matches ? "h6" : "h5"}
                        sx={{ ml: 1, fontWeight: 600 }}
                    >
                        GG Recipes
                    </Typography>
                </FlexCenterMin>

                <Box sx={{ ml: "auto" }}>
                    {userInfo !== null ? (
                        <>
                            {!matches ? (
                                <Button2 onClick={() => navigate("/myrecipelist")}>
                                    <Typography variant="body2">
                                        My Recipes
                                    </Typography>
                                </Button2>
                            ) : (
                                <IconButton
                                    sx={{ bgcolor: "background.default", m: 0.5 }}
                                    onClick={() => navigate("/myrecipelist")}
                                >
                                    <Tooltip title="My Recipes">
                                        <FavoriteIcon />
                                    </Tooltip>
                                </IconButton>
                            )}

                            {!matches ? (
                                <Button2 onClick={() => navigate("/mysavedlist")}>
                                    <Typography variant="body2">
                                        Saved Recipes
                                    </Typography>
                                </Button2>
                            ) : (
                                <IconButton
                                    sx={{ bgcolor: "background.default", m: 0.5 }}
                                    onClick={() => navigate("/mysavedlist")}
                                >
                                    <Tooltip title="Saved Recipes">
                                        <BookmarkIcon />
                                    </Tooltip>
                                </IconButton>
                            )}
                        </>
                    ) :
                        null
                    }

                    <IconButton
                        sx={{ bgcolor: "background.default", m: 0.5 }}
                        onClick={() => setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))}
                    >
                        {mode === "light" ?
                            <DarkModeIcon /> :
                            <LightModeIcon />
                        }
                    </IconButton>

                    {location.pathname.includes("/login") ? null : (
                        <>
                            {matches ? (
                                <IconButton
                                    sx={{ bgcolor: "background.default" }}
                                    onClick={() => userInfo === null ? navigate("/login") : Logout()}
                                >
                                    {userInfo === null ?
                                        <LoginIcon /> :
                                        <LogoutIcon />
                                    }
                                </IconButton>
                            ) : (
                                <Button2 onClick={() => userInfo === null ? navigate("/login") : Logout()}>
                                    <Typography variant="body2">
                                        {userInfo === null ? "Login" : "Logout"}
                                    </Typography>
                                </Button2>
                            )}
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
