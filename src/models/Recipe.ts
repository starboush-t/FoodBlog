import mongoose from "mongoose";

interface Recipe {
  name: string;
  description: string;
  email: string;
  ingredients: [];
  category: string;
  image: string;
}

const recipeSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Recipe", recipeSchema);
