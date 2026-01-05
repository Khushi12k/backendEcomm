import { Router } from "express";
import { checkForlogin } from "../middlewares/MiddlewarresAuth.js";

const checkRouter = Router();

checkRouter.get("/login", (req, res, next) =>
  checkForlogin(req, res, null, "user")
);

export default checkRouter;



