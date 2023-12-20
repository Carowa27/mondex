import express from "express";
const router = express.Router();

// const authRoutes = require("./authRoutes");
import userRoutes from "./userRoutes.js";
import cardRoutes from "./cardRoutes.js";
import collectionRoutes from "./collectionRoutes.js";

// router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/collections", collectionRoutes);
router.use("/cards", cardRoutes);

export default router;
