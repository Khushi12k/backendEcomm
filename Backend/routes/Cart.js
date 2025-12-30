import { Router } from "express";
import { addToCart, fetchCart, removeCartItem } from "../controllers/Cart.js";
import { checkForlogin } from "../middlewares/MiddlewarresAuth.js";

const cartRouter = Router();

// Add / update cart item
cartRouter.post(
  "/add",
  (req, res, next) => checkForlogin(req, res, next, "user"),
  addToCart
);

// Fetch cart items
cartRouter.get(
  "/",
  (req, res, next) => checkForlogin(req, res, next, "user"),
  fetchCart
);

// DELETE cart item
cartRouter.delete(
  "/remove/:id",
  (req, res, next) => checkForlogin(req, res, next, "user"),
  removeCartItem
);

export default cartRouter;
