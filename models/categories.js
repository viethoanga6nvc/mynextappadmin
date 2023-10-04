import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Categories =
  mongoose.models.Categories || mongoose.model("Categories", categorySchema);

export default Categories;
