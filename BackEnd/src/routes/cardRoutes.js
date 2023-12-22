import express from "express";
import {
  getAllOwnedCards,
  getOwnedCardById,
  createCard,
  getAllCards,
  getAllCardsFromCollectionById,
  updateAmountOnCard,
} from "../controllers/cardController.js";
const router = express.Router();

router.get("/", getAllCards);
router.get("/users/:userId/:cardId", getOwnedCardById);

router.post("/users/", getAllOwnedCards);
router.post("/collections/", getAllCardsFromCollectionById);

router.post("/updateCard", updateAmountOnCard);

router.post("/", createCard);

// router.delete("/:cardId", deleteOwnedCardById);

export default router;
