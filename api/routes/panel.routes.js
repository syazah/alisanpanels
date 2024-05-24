import express from "express";
import {
  panelController,
  addNewCollectionController,
  fetchAllCollections,
  addToCollection,
  fetchPanelsController,
} from "../controllers/panel.controller.js";
const router = express.Router();

router.post("/panel/create", panelController);
router.post("/panel/add-collection", addNewCollectionController);
router.post("/panel/fetch-collection", fetchAllCollections);
router.post("/panel/fetch-panels", fetchPanelsController);
router.post("/panel/add-to-collection", addToCollection);

export default router;
