import express from "express";
import {
  getAllOwnedCollections,
  getOwnedCollectionByCollectionName,
  createCollection,
  deleteCollectionById,
} from "../controllers/collectionController.js";
const router = express.Router();

//get
router.get("/users/:userId", getAllOwnedCollections);
router.post("/collection/", getOwnedCollectionByCollectionName);

// create
router.post("/createCollection/", createCollection);

// delete
router.post("/deleteCollection/", deleteCollectionById);

export default router;
