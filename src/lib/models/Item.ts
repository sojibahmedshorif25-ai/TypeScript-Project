import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  location: string;
  priority: "low" | "medium" | "high";
  date: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ItemSchema = new Schema<IItem>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    fullDescription: {
      type: String,
      required: [true, "Full description is required"],
    },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["electronics", "fashion", "food", "health", "education", "services", "other"],
    },
    images: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    location: { type: String, default: "" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    date: { type: String, default: "" },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Item =
  mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
