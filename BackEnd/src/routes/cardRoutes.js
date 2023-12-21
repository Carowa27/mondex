import express from "express";
import {
  getAllOwnedCards,
  getOwnedCardById,
  createCard,
  getAllCards,
} from "../controllers/cardController.js";
const router = express.Router();

router.get("/", getAllCards);
// router.get("/users/:userId", getAllOwnedCards);
router.post("/users/", getAllOwnedCards);
router.get("/users/:userId/:cardId", getOwnedCardById);

// router.put("/:cardId", updateAmountOfCard);

router.post("/", createCard);

// router.delete("/:cardId", deleteOwnedCardById);

export default router;
