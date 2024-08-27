import { Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import soup from "../assets/images/soup-576424_640.png";
import breakfast from "../assets/images/sandwich-155786_1280.png";
import lunch from "../assets/images/pasta-576417_640.png";
import dinner from "../assets/images/bread-1296280_640.png";
import appetizer from "../assets/images/french-fries-147720_640.png";
import smoothie from "../assets/images/vegetables-575615_640.png";
import salad from "../assets/images/salad-575436_1280.png";
import { modeContext } from "../App";
import { Title } from "../assets/styles/CommonStyles";
import { useNavigate } from "react-router-dom";

export const recipes = [
    { id: 1, category: "All", image: soup },
    { id: 2, category: "Breakfast", image: breakfast },
    { id: 3, category: "Lunch", image: lunch },
    { id: 4, category: "Dinner", image: dinner },
    { id: 5, category: "Appetizer", image: appetizer },
    { id: 6, category: "Smoothie", image: smoothie },
    { id: 7, category: "Salad", image: salad },
];

const Categories = () => {
    const [count, setCount] = useState(0);
    const [down, setDown] = useState(false);
    const [left, setLeft] = useState(0);
    const inputRef = useRef(null);
    const mode = useContext(modeContext);
    const navigate = useNavigate();

    const mouseDown = (e) => {
        setCount(e.clientX);
        setDown(true);
    };

    const mouseMove = (e) => {
        if (!down || !inputRef.current) return;
        e.preventDefault();
        const newval = (e.clientX - count) * 0.115;
        inputRef.current.scrollLeft = left - newval;
    };

    const mouseUp = () => {
        setDown(false);
    };

    const mouseScroll = () => {
        setLeft(inputRef.current.scrollLeft);
    };

    useEffect(() => {
        mode.setCategory("All");
    }, [navigate]);

    return (
        <div>
            <Title variant="h4">Popular Categories</Title>

            <div
                className="slider-container"
                ref={inputRef}
                onMouseDown={(e) => mouseDown(e)}
                onMouseMove={(e) => mouseMove(e)}
                onScroll={() => mouseScroll()}
                onMouseUp={() => mouseUp()}
            >
                <div className="slideritems-container">
                    {recipes.map((v, i) => {
                        return (
                            <div className="minicaraousel" key={i}>
                                <div
                                    className="minicaraousel-content"
                                    style={{
                                        backgroundColor:
                                            mode.mode === "dark"
                                                ? v.category === mode.category
                                                    ? "#E4EBE4"
                                                    : "#6EAEAE"
                                                : v.category === mode.category
                                                    ? "#6EAEAE"
                                                    : "#E4EBE4",
                                    }}
                                    onClick={() => { mode.setCategory(v.category) }}
                                >
                                    <img
                                        src={v.image}
                                        alt=""
                                        height={"100px"}
                                    />

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            p: 2,
                                            color:
                                                mode.mode === "dark"
                                                    ? v.category === mode.category
                                                        ? "#000000"
                                                        : "#FFFFFF"
                                                    : v.category === mode.category
                                                        ? "#FFFFFF"
                                                        : "#000000",
                                        }}
                                    >
                                        {v.category}
                                        <br />
                                        Recipes
                                    </Typography>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Categories;
