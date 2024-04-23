import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    savedRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "recipes"
        }
    ],
})

export const UserModel = mongoose.model("user", UserSchema);
