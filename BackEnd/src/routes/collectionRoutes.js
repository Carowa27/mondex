import express from "express";
import {
  getAllOwnedCollections,
  getOwnedCollectionById,
  createCollection,
} from "../controllers/collectionController.js";
const router = express.Router();

router.get("/users/:userId", getAllOwnedCollections);
router.get("/:collectionId", getOwnedCollectionById);

router.post("/", createCollection);

export default router;
