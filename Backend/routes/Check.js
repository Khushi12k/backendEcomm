
import { Router } from "express";
import { checkForlogin } from "../middlewares/MiddlewarresAuth.js";

const checkRouter = Router();

checkRouter.get("/login", checkForlogin);

export default checkRouter;