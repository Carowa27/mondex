import express from "express";
import {
  getAllOwnedCards,
  getOwnedCardById,
  createCard,
  getAllCards,
  getAllCardsFromCollectionById,
} from "../controllers/cardController.js";
const router = express.Router();

router.get("/", getAllCards);
router.get("/users/:userId/:cardId", getOwnedCardById);

router.post("/users/", getAllOwnedCards);
router.post("/collections/", getAllCardsFromCollectionById);

// router.put("/:cardId", updateAmountOfCard);

router.post("/", createCard);

// router.delete("/:cardId", deleteOwnedCardById);

export default router;
