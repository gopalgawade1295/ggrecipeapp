import React from "react";
import { Toolbar } from "@mui/material";
import Categories from "../components/Categories";
import Form from "../components/Form";
import Recipe from "../components/Recipe";
import Blog from "../components/Blog";
import Sections from "../components/Sections";

const Home = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    return (
        <div>
            <Toolbar />

            {/*Sections*/}
            <Sections />

            {/*Categories*/}
            <Categories />

            {/*Recipes*/}
            <Recipe />

            {/*Form*/}
            {userInfo === null ? <Form /> : null}

            {/*Blog*/}
            <Blog />
        </div>
    );
};

export default Home;
