import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipeRouter } from "./routes/receipe.js";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

const url = process.env.REACT_APP_SECRET_KEY;
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.listen(3001, () => console.log('Server started...'));
