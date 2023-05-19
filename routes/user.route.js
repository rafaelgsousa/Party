import { Router } from "express";

import { getUserById, updateUserById, updatePasswordById } from "../controllers/users.controller.js";
import auth from "../middlewares/authorizationCheck.middleware.js";
// import requestCheck from "../middlewares/requestCheck.middleware.js";
// import { } from "../helpers/shapeRequest/shapeRequest.js";

const router = Router();

router.get("/:id", auth, getUserById);

router.patch("/:id", auth, updateUserById);

router.patch("/update-password/:id", auth, updatePasswordById);

export default router;
