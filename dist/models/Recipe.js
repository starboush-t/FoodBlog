"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recipeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: "This field is required",
    },
    description: {
        type: String,
        required: "This field is required",
    },
    email: {
        type: String,
        required: "This field is required",
    },
    ingredients: {
        type: Array,
        required: "This field is required",
    },
    category: {
        type: String,
        enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
        required: "This field is required",
    },
    image: {
        type: String,
        required: true,
    },
});
recipeSchema.index({ name: "text", description: "text" });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });
module.exports = mongoose_1.default.model("Recipe", recipeSchema);
//# sourceMappingURL=Recipe.js.map