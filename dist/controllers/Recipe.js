"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
exports.homePage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limitNumber = 4;
        const categories = yield Category.find({}).limit(limitNumber);
        const latest = yield Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = yield Recipe.find({ category: "Thai" }).limit(limitNumber);
        const american = yield Recipe.find({ Category: "American" }).limit(limitNumber);
        const chinese = yield Recipe.find({ category: "Chinese" }).limit(limitNumber);
        const mexican = yield Recipe.find({ category: "Mexican" }).limit(limitNumber);
        const food = { latest, thai, american, chinese, mexican };
        res.render("main", {
            pageTitle: "Cooking Blog - Home",
            categories,
            food,
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.exploreCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limitNumber = 20;
        const categories = yield Category.find({}).limit(limitNumber);
        res.status(201).render("categories", {
            pageTitle: "Cooking Blog - Categories",
            categories,
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.exploreCategoriesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = yield Recipe.find({ category: categoryId }).limit(limitNumber);
        res.render("categories", {
            pageTitle: `Cooking Blog - Categoreis`,
            categoryById,
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
});
exports.exploreRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeId = req.params.id;
        const recipe = yield Recipe.findById(recipeId);
        res.status(201).render("recipe", {
            pageTitle: `Cooking Blog - ${recipe.name} Recpie`,
            recipe,
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.searchRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchTerm = req.body.searchTerm;
        let recipe = yield Recipe.find({
            $text: { $search: searchTerm, $diacriticSensitive: true },
        });
        res.render("search", { pageTitle: "Cooking Blog - Search", recipe });
    }
    catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
});
/**
 * GET /explore-latest
 * Explplore Latest
 */
exports.exploreLatest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limitNumber = 20;
        const recipe = yield Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render("explore-latest", {
            pageTitle: "Cooking Blog - Explore Latest",
            recipe,
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
});
/**
 * GET /explore-random
 * Explore Random as JSON
 */
exports.exploreRandom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = yield Recipe.find({}).countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = yield Recipe.findOne().skip(random).exec();
        res.render("explore-random", {
            pageTitle: "Cooking Blog - Explore Latest",
            recipe,
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
});
/**
 * GET /submit-recipe
 * Recipe submit form
 */
exports.submitRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("submit-recipe-form", {
            pageTitle: "Submit new recipe",
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
});
/**
 * POST /submit-recipe
 * Submit Recipe
 */
exports.submitRecipeOnPost = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const description = req.body.description;
    const ingredients = req.body.ingredients;
    const category = req.body.category;
    const image = req.file;
    const path = image === null || image === void 0 ? void 0 : image.path;
    const newPath = path === null || path === void 0 ? void 0 : path.replace(`dist\\`, "");
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
    }
    catch (error) {
        req.flash("infoErrors", error);
        res.redirect("/submit-recipe");
    }
};
exports.about = (req, res, next) => {
    res.render("about", {
        pageTitle: "Abouts Page",
    });
};
//# sourceMappingURL=recipe.js.map