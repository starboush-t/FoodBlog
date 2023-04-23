"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import recpie from "../controllers/recipe";
const recpie = require("../controllers/recipe");
const router = express_1.default.Router();
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
exports.default = router;
//# sourceMappingURL=recipe.js.map