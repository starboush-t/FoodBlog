import express from "express";

// import recpie from "../controllers/recipe";

const recpie = require("../controllers/recipe");

const router = express.Router();

router.get("/", recpie.homePage);
router.get("/categories", recpie.exploreCategories);
router.get("/categories/:id", recpie.exploreCategoriesById);
router.get("/recipe/:id", recpie.exploreRecipe);
router.post("/search", recpie.searchRecipe);
router.get("/explore-latest", recpie.exploreLatest);
router.get("/explore-random", recpie.exploreRandom);
router.get('/submit-recipe', recpie.submitRecipe);
router.post('/submit-recipe', recpie.submitRecipeOnPost);
router.get("/about", recpie.about);

export default router;
