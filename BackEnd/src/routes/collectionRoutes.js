import express from "express";
import {
  getAllOwnedCollections,
  getOwnedCollectionByCollectionName,
  createCollection,
} from "../controllers/collectionController.js";
const router = express.Router();

router.get("/users/:userId", getAllOwnedCollections);

router.post("/collection/", getOwnedCollectionByCollectionName);

router.post("/", createCollection);

export default router;
