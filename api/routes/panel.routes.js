import express from "express";
import {
  panelController,
  addNewCollectionController,
  fetchAllCollections,
  addToCollection,
  fetchPanelsController,
  uploadPanelImage,
} from "../controllers/panel.controller.js";
import { singleUpload } from "../utils/multer.utils.js";
const router = express.Router();

router.post("/panel/create", panelController);
router.post("/panel/add-collection", addNewCollectionController);
router.post("/panel/fetch-collection", fetchAllCollections);
router.post("/panel/fetch-panels", fetchPanelsController);
router.post("/panel/add-to-collection", addToCollection);

router.post("/panel/upload-image", singleUpload, uploadPanelImage);

export default router;
