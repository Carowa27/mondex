import express from "express";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", getUser);

export default router;
