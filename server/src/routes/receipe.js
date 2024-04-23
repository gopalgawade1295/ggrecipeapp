import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipe.js";
import { UserModel } from "../models/User.js";
import { verifyToken } from "./user.js";

const router = express.Router();

//Get all recipes
router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });

  try {
    await recipe.save();
    res.status(201).json({ data: 'Recipe created successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a recipe
router.put("/update/:recipeId", async (req, res) => {
  try {
    await RecipesModel.findByIdAndUpdate({ _id: req.params.recipeId }, {
      name: req.body.name,
      image: req.body.image,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      imageUrl: req.body.imageUrl,
      cookingTime: req.body.cookingTime,
      userOwner: req.body.userOwner,
    });
    res.status(201).json({ data: 'Updated Successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete recipe by ID
router.delete("/:recipeId", async (req, res) => {
  try {
    await RecipesModel.findByIdAndDelete(req.params.recipeId);
    res.status(201).json({ data: 'Deleted Successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ data: 'Saved Successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ data: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.status(201).json({ data: savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as recipeRouter };
