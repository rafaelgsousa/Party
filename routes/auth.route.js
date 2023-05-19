import { Router } from "express";

import { login, register } from "../controllers/users.controller.js";
import requestCheck from "../middlewares/requestCheck.middleware.js";
import { shapeLogin, shapeRegister } from "../helpers/shapeRequest/shapeRequest.js";

const router = Router();

router.post("/register", requestCheck(shapeRegister), register);

router.post("/login", requestCheck(shapeLogin), login);

export default router;
