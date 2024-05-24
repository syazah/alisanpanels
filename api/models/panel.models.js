import mongoose from "mongoose";

const PanelSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    panelSize: {
      type: Number,
      required: true,
    },
    panelVariant: {
      //sbcfpd
      type: [Number],
      required: true,
    },
    panelGlass: {
      type: String,
      required: true,
    },
    panelFrame: {
      type: String,
      required: true,
    },
    panelIcons: {
      type: [mongoose.Schema.Types.Mixed],
      ref: "Panelicons",
    },
    panelWall: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const PanelData = mongoose.model("PanelData", PanelSchema);
