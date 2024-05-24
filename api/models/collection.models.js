import mongoose from "mongoose";

const CollectionModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  collectionArray: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "PanelData",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Collection = mongoose.model("Collection", CollectionModel);
