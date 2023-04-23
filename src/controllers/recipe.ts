import { Request, Response, NextFunction } from "express";

const Recipe = require("../models/Recipe");
const Category = require("../models/Category");

exports.homePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limitNumber = 4;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ Category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );
    const mexican = await Recipe.find({ category: "Mexican" }).limit(
      limitNumber
    );

    const food = { latest, thai, american, chinese, mexican };
    res.render("main", {
      pageTitle: "Cooking Blog - Home",
      categories,
      food,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

exports.exploreCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.status(201).render("categories", {
      pageTitle: "Cooking Blog - Categories",
      categories,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

exports.exploreCategoriesById = async (req: Request, res: Response) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      pageTitle: `Cooking Blog - Categoreis`,
      categoryById,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.exploreRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    res.status(201).render("recipe", {
      pageTitle: `Cooking Blog - ${recipe.name} Recpie`,
      recipe,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

exports.searchRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { pageTitle: "Cooking Blog - Search", recipe });
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /explore-latest
 * Explplore Latest
 */
exports.exploreLatest = async (req: Request, res: Response) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render("explore-latest", {
      pageTitle: "Cooking Blog - Explore Latest",
      recipe,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /explore-random
 * Explore Random as JSON
 */

exports.exploreRandom = async (req: Request, res: Response) => {
  try {
    let count = await Recipe.find({}).countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render("explore-random", {
      pageTitle: "Cooking Blog - Explore Latest",
      recipe,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /submit-recipe
 * Recipe submit form
 */

exports.submitRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.render("submit-recipe-form", {
      pageTitle: "Submit new recipe",
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * POST /submit-recipe
 * Submit Recipe
 */
exports.submitRecipeOnPost = (req: Request, res: Response) => {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const description: string = req.body.description;
  const ingredients: string = req.body.ingredients;
  const category: string = req.body.category;
  const image = req.file;
  const path = image?.path;
  const newPath = path?.replace(`dist\\`, "");
  // console.log(newPath);

  try {
    const recipe = new Recipe({
      name: name,
      description: description,
      email: email,
      ingredients: ingredients,
      category: category,
      image: newPath,
    });

    // console.log(image);
    // console.log(recipe);

    recipe.save();
    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("/submit-recipe");
  } catch (error: any) {
    req.flash("infoErrors", error);
    res.redirect("/submit-recipe");
  }
};

exports.about = (req: Request, res: Response, next: NextFunction) => {
  res.render("about", {
    pageTitle: "Abouts Page",
  });
};
