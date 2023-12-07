import express from "express";
import {
  getAllOwnedCards,
  getOwnedCardById,
  createCard,
  getAllCards,
} from "../controllers/cardController.js";
const router = express.Router();

router.get("/cards/", getAllCards);
router.get("/cards/:userId", getAllOwnedCards);
router.get("/cards/:cardId", getOwnedCardById);

// router.put("/cards/:cardId", updateAmountOfCard);

router.post("/", createCard);

// router.delete("/:cardId", deleteOwnedCardById);

export default router;
