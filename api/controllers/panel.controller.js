import { Collection } from "../models/collection.models.js";
import { PanelData } from "../models/panel.models.js";
import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/errorHandler.utils.js";
import { getDataUri } from "../utils/features.utils.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
dotenv.config();

// CREATE PANEL
export const panelController = async (req, res, next) => {
  const bodyData = req.body;
  const panelVariantArray = [
    //sbcfpd
    bodyData.panelVariant.switches,
    bodyData.panelVariant.bells,
    bodyData.panelVariant.curtains,
    bodyData.panelVariant.fans,
    bodyData.panelVariant.plugs,
    bodyData.panelVariant.dimmers,
  ];
  try {
    const panelModel = new PanelData({
      author: bodyData.user._id,
      panelSize: bodyData.panelSize,
      panelVariant: panelVariantArray,
      panelGlass: bodyData.panelGlass,
      panelFrame: bodyData.panelFrame,
      panelWall: bodyData.panelWall,
      panelIcons: bodyData.panelIcons,
      panelImage: bodyData.url,
    });
    await panelModel.save();
    res.status(200).json({ message: "Success", panelId: panelModel._id });
  } catch (error) {
    next(error);
  }
};

// CREATE COLLECTION
export const addNewCollectionController = async (req, res, next) => {
  try {
    const { userId, collectionName } = req.body;
    const name = userId + "/" + collectionName;
    const collectionDocument = new Collection({
      name,
      author: userId,
    });
    const createdCollection = await collectionDocument.save();
    await cloudinary.api.create_folder(`alisan/${userId}/${collectionName}`);
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { collectionsArray: createdCollection._id } },
      { new: true }
    );
    res.status(200).json({ success: true, message: "CREATED" });
  } catch (error) {
    next(error);
  }
};

//Fetch All Collections
export const fetchAllCollections = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const validUser = await User.findOne({ _id: _id })
      .populate("collectionsArray")
      .select("collectionsArray");
    res
      .status(200)
      .json({ success: true, collectionsArray: validUser.collectionsArray });
  } catch (error) {
    next(error);
  }
};

//ADD TO COLLECTION
export const addToCollection = async (req, res, next) => {
  try {
    const { chosenCollection, userId, panelId } = req.body;
    if (chosenCollection === "" || !chosenCollection) {
      return next(errorHandler(400, "Choose A Collection"));
    }
    const name = userId + "/" + chosenCollection;
    const collectionFound = await Collection.findOneAndUpdate(
      { name: name },
      { $push: { collectionArray: panelId } },
      { new: true }
    );
    res.status(200).json({ success: true, message: collectionFound });
  } catch (error) {
    next(error);
  }
};

//FETCH ALL PANELS
export const fetchPanelsController = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const validUser = await Collection.findOne({ _id: _id }).populate(
      "collectionArray"
    );
    res.status(200).json({ success: true, message: validUser.collectionArray });
  } catch (error) {
    next(error);
  }
};

//UPLOAD IMAGE
export const uploadPanelImage = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    const { folder } = req.body;
    const { id } = await jwt.verify(access_token, process.env.JWT_SECRET);
    const file = getDataUri(req.file);
    let folderPath = `alisan/${id}`;
    if (folder) {
      folderPath = `alisan/${id}/${folder}`;
    }
    const url = await cloudinary.v2.uploader.upload(file.content, {
      folder: folderPath,
      use_filename: true,
    });
    res.status(200).json({ success: true, url: url.url });
  } catch (error) {
    console.log(error);
  }
};
