import React, { useContext } from "react";
import {
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../assets/images/recipe-book-icon.png";
import logo1 from "../assets/images/recipe-book-icon1.png";
import { FlexBetween, FooterBox } from "../assets/styles/FooterStyles";
import { modeContext } from "../App";
import { FlexCenterMin, FlexStart } from "../assets/styles/CommonStyles";

const Footer = () => {
    const mode = useContext(modeContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <FooterBox sx={{ backgroundColor: mode.mode === "dark" ? "#484848" : "#E4EBE4", color: "text.primary" }}>
            <FlexBetween>
                <FlexCenterMin>
                    {!matches ? (
                        <img
                            src={mode.mode === "dark" ? logo : logo1}
                            alt=""
                            height={"50px"}
                            width={"50px"}
                        />
                    ) : null}

                    <Typography
                        variant={matches ? "h6" : "h5"}
                        sx={{ ml: 1, fontWeight: 600 }}
                    >
                        GG Recipes
                    </Typography>
                </FlexCenterMin>

                <Box sx={{ textAlign: "left", minWidth: "200px" }}>
                    <FlexStart>
                        <Typography variant="body1" sx={{ p: 1 }}>
                            How to reach me?
                        </Typography>

                        <a href="https://in.linkedin.com/in/gopalgawde1295">
                            <IconButton sx={{ p: 1, color: mode.mode === "dark" ? "text.primary" : "#FE794C" }}>
                                <LinkedInIcon />
                            </IconButton>
                        </a>

                        <a href="https://github.com/gopalgawade1295">
                            <IconButton sx={{ p: 1, color: mode.mode === "dark" ? "text.primary" : "#FE794C" }}>
                                <GitHubIcon />
                            </IconButton>
                        </a>
                    </FlexStart>

                    <Typography variant="body1" sx={{ p: 1 }}>
                        *This project is made for learning purpose only.
                    </Typography>

                    <Typography variant="body1" sx={{ p: 1 }}>
                        *All images by{" "}
                        <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=575436">
                            OpenClipart-Vectors
                        </a>{" "}
                        from{" "}
                        <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=575436">
                            Pixabay.
                        </a>
                    </Typography>

                    <Typography variant="body1" sx={{ p: 1 }}>
                        *All blogs generated using AI.
                    </Typography>
                </Box>
            </FlexBetween>
        </FooterBox>
    );
};

export default Footer;
