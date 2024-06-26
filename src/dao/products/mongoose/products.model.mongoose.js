import { Schema } from "mongoose";
import { randomUUID } from "node:crypto";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: String, required: true },
    thumbnail: { type: Array, required: true },
    code: { type: String, required: true, unique: true },
    status: { type: Boolean },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    timestamp: { type: Date, default: Date.now },
    owner: {
      type: String,
      default: "admin",
    },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);
export default productSchema;
