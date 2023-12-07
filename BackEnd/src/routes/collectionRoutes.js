import express from "express";
import {
  getAllOwnedCollections,
  getOwnedCollectionById,
  createCollection,
} from "../controllers/collectionController.js";
const router = express.Router();

router.get("/collections/:userId", getAllOwnedCollections);
router.get("/collections/:collectionId", getOwnedCollectionById);

router.post("/", createCollection);

export default router;
