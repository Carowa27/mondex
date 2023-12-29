import express from "express";
import {
  getAllOwnedCards,
  getOwnedCardById,
  createCard,
  getAllCards,
  getAllCardsFromCollectionById,
  updateAmountOnCard,
  deleteOwnedCardById,
} from "../controllers/cardController.js";
const router = express.Router();

//get
router.get("/", getAllCards);
router.post("/getCard/", getOwnedCardById);
router.post("/users/", getAllOwnedCards);
router.post("/collections/", getAllCardsFromCollectionById);

// update
router.post("/updateCard", updateAmountOnCard);

// create
router.post("/", createCard);

// delete
router.post("/deleteCard", deleteOwnedCardById);

export default router;
