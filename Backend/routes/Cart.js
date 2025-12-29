import { Router } from "express";
import { addToCart, fetchCart } from "../controllers/Cart.js";
import { checkForlogin } from "../middlewares/MiddlewarresAuth.js";

const cartRouter = Router();

cartRouter.post(
  "/add",
  (req, res, next) => checkForlogin(req, res, next, "user"),
  addToCart
);
cartRouter.get(
  "/",
  (req, res, next) => checkForlogin(req, res, next, "user"),
  fetchCart
);

export default cartRouter;
